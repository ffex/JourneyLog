import { useContext, useEffect, useState } from "react";

import { HttpError, IResourceComponentsProps, useCreate, useCreateMany, useDeleteMany, useList } from "@pankod/refine-core";
import {
    Create,
    Form,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
    RcFile,
    InputNumber,
    Row,
    Col,
    Steps,
    Card,
    Button,
    Typography,
    List,
    Table,
    useTable,
    AntdList,
    DeleteButton,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IJourney, IRoute, IStop, IVehicle } from "interfaces";
import { storage, normalizeFile } from "utility";
import { CarOutlined, DeleteFilled, SaveFilled } from "@ant-design/icons";
import { Map, MapMarker } from "components/map";
import marker from "components/map/marker";
import { stringify } from "querystring";
import { JourneyModeContext } from "contexts/journey";

const { Text } = Typography;

export const StopsCreate: React.FC<IResourceComponentsProps> = () => {

    const { idJourney } = useContext(JourneyModeContext);
    const [markers, setMarkers] = useState<IStop[]>([]);
    const listStops = useList<IStop, HttpError>({
        resource: "63eb883cc7b7c2658eaa",
        liveMode:"manual",
        config: {
            filters: [
                {
                    field: "journeyId",
                    operator: "eq",
                    value: idJourney,
                },
            ],
            hasPagination: false,
        },
    });
    const dataStops = listStops.data?.data ?? [];
    const listRoutes = useList<IRoute, HttpError>({
        resource: "63f249460746d8c64727",
        liveMode:"manual",
        config: {
            filters: [
                {
                    field: "journeyId",
                    operator: "eq",
                    value: idJourney,
                },
            ],
            hasPagination: false,
        },
    });
    const dataRoutes = listRoutes.data?.data ?? [];
    const mutateDeleteMany = useDeleteMany({
        mutationOptions: {
            retry: 2,
        },
    });

    const mutateStops = useCreateMany();
    const mutateRoute = useCreate();

    const directionService = new google.maps.DirectionsService();
    let currentIndex = 1;
    /* let skipEvent = false; */


    const handleChange = (place: google.maps.places.PlaceResult) => {

        setMarkers((currentMarkers) => {
            const foundDuplicate = currentMarkers.filter((elem) => elem.name == place.name && elem.sequence == currentIndex - 1);

            if (foundDuplicate.length > 0) {
                return currentMarkers;
            } else {

                return [...currentMarkers, {
                    sequence: currentIndex++,
                    name: place.name!,
                    location: JSON.stringify(place.geometry?.location),
                    place: place,
                    journeyId: idJourney,
                }]
            }

        });

    };

    const handleDeleteClick = (item: IStop) => {
        let i = 0;

        setMarkers((currentMarkers) => {
            const newStops = currentMarkers.filter((place) => place.sequence != item.sequence)
                .map(place => {

                    i++;
                    place.sequence = i;
                    return place

                });

            return newStops;
        });
        currentIndex--;
    };
    const handleSaveClick = (() => {
        const stopsToInsert = markers.map(marker => {
            const { place, ...dbObject } = marker;
            return dbObject;
        });
        mutateDeleteMany.mutate({
            
            resource:"63eb883cc7b7c2658eaa",
            ids: dataStops.map((item) => item.id!),
        
            //invalidates:["list", "many", ],
        });
        mutateDeleteMany.mutate({
            
            resource:"63f249460746d8c64727",
            ids: dataRoutes.map((item) => item.id!),
        
            //invalidates:["list", "many", ],
        });
        mutateStops.mutate(
            {
                resource: "63eb883cc7b7c2658eaa",
                values: stopsToInsert,
            },
            {
                onError: (error, variables, context) => {
                    console.log("Oh oh! something went wrong");
                },
                onSuccess: (data, variables, context) => {
                    console.log("Oh Yes!");
                    const stopsResult = data.data;
                    if (stopsResult.length > 1) {
                        for (let index = 0; index < stopsResult.length - 1; index++) {

                            directionService.route({
                                origin: JSON.parse(stopsResult[index].location),
                                destination: JSON.parse(stopsResult[index + 1].location),
                                travelMode: google.maps.TravelMode.DRIVING
                            }, (result, status) => {

                                if (status == google.maps.DirectionsStatus.OK) {
                                    mutateRoute.mutate(
                                        {
                                            resource: "63f249460746d8c64727",
                                            values: {
                                                fromStopId: stopsResult[index].id!.toString(),
                                                toStopId: stopsResult[index + 1].id!.toString(),
                                                vehicleId: "",
                                                km: result?.routes[0].legs[0].distance?.text ?? "-",
                                                time: result?.routes[0].legs[0].duration?.text ?? "-",
                                                journeyId: idJourney,
                                            },
                                        },
                                        {
                                            onError: (error, variables, context) => {
                                                console.log("Oh oh! something went wrong");
                                            },
                                            onSuccess: (data, variables, context) => {
                                                console.log("Oh Yes!");
                                            },
                                        },
                                    );


                                }
                            });
                        }
                    }



                },
            },
        );

    });


    useEffect(() => {
        // 👇️ call method in useEffect hook
        const input = document.getElementById("pac-input") as HTMLInputElement;
        console.log(input);
        const options = {
            fields: ["address_components", "geometry", "name"],
        };

        const autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener("place_changed", () => {

            const place = autocomplete.getPlace();

            if (!place.geometry || !place.geometry.location) {
                // window.alert("No details available for input: '" + place.name + "'");
                return;
            }


            /* if (skipEvent) { */
            handleChange(place);

            /* }
            skipEvent = !skipEvent; */
        });

    }, []);

    const defaultProps = {
        center: {
            lat: 43.1103306,
            lng: 12.3909092,
        },
        zoom: 10,
    };


    return (

        <>
            <Row>
                <Col span={18}>
                    <Card
                        bodyStyle={{ height: 700 }}
                    >
                        <Map {...defaultProps} >
                            {markers.map((loc) => {
                                return (
                                    <MapMarker
                                        key={loc.sequence}
                                        label={loc.sequence.toString()}
                                        position={loc.place.geometry?.location}

                                    />
                                );
                            })}

                        </Map>
                    </Card>
                </Col>
                <Col span={6} >
                    <Card>
                        <Input id="pac-input" placeholder="Basic usage"

                        />

                    </Card>


                    <Card
                        bodyStyle={{ height: 567 }}
                        actions={[
                            <SaveFilled onClick={() => handleSaveClick()} />
                        ]}
                    >

                        <AntdList
                            pagination={{ position: "bottom", align: "center", pageSize: 8 }}
                            dataSource={markers}
                            style={{ minHeight: 5 }}
                            renderItem={(item) => (
                                <AntdList.Item
                                    actions={[<Button
                                        icon={<DeleteFilled />}
                                        onClick={(event) => handleDeleteClick(item)}
                                    ></Button>]}
                                >
                                    {item.sequence} - {item.name}

                                </AntdList.Item>

                            )}
                        >
                        </AntdList>

                    </Card>
                </Col>
            </Row>
            <Row>

            </Row>
        </>



    );
};
