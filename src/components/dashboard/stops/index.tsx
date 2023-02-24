import { EditFilled, HomeFilled, HomeTwoTone } from "@ant-design/icons";
import { AntdList, Button, Card, Space, Timeline } from "@pankod/refine-antd";
import { HttpError, useList, useNavigation } from "@pankod/refine-core";
import { JourneyModeContext } from "contexts/journey";
import { IStop } from "interfaces";
import { useContext } from "react";

export const StopsList: React.FC = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const resourceStops = "63eb883cc7b7c2658eaa";
    const { create, edit } = useNavigation();
    const { data, isLoading, isError } = useList<IStop, HttpError>({
        resource: resourceStops,
        config: {
            sort: [
                {
                    field: "sequence",
                    order: "asc",
                }
            ],
            filters: [
                {
                    field: "journeyId",
                    operator: "eq",
                    value: idJourney
                },
            ],
        }
    });

    const stops = data?.data.map((elem)=>{

        let ColorReservation ="#d21404"; //red
        if(elem.reservation){
            ColorReservation ="#52c41a";
        }
        if(elem.numberNights! < 1){
            ColorReservation ="#3d67fc";
        }
        return {...elem, 
            colorReservation:ColorReservation,
            
        }
    }) ?? [];
    const handleeditClick = (item: IStop) => {
        edit(resourceStops, item.id!)
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <Card title="Stops">


                        <AntdList
                            pagination={{ position: "bottom", align: "center", pageSize: 8 }}
                            dataSource={stops}
                            style={{ minHeight: 5 }}
                            renderItem={(item) => (
                                <AntdList.Item
                                    actions={[
                                     <Space>
                                     <HomeTwoTone twoToneColor={item.colorReservation} />  
                                     <Button icon={
                                        <EditFilled />
                                     }
                                     onClick={(event) => handleeditClick(item)}
                                     >
                                    </Button>
                                    </Space>
                                ]}
                                >
                                    {item.sequence} - {item.name}

                                </AntdList.Item>

                            )}
                        >
                        </AntdList>

        </Card>

    );
};