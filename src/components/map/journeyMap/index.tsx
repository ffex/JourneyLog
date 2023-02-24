import { Card } from "@pankod/refine-antd";
import { HttpError, useList } from "@pankod/refine-core";
import { JourneyModeContext } from "contexts/journey";
import { IStop } from "interfaces";
import { useContext } from "react";
import { Map, MapMarker } from "..";

export const JourneyMap: React.FC = () => {
    const { idJourney} = useContext(JourneyModeContext);
    const resourceStops = "63eb883cc7b7c2658eaa";
    const { data, isLoading, isError } = useList<IStop, HttpError>({
        resource: resourceStops,
        config:{
            filters: [
                {
                    field: "journeyId",
                    operator: "eq",
                    value: idJourney
                },
            ],
        }
    });

    const stops = data?.data ?? [];
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }
    console.log(stops);
    const defaultCenter = {
        lat: 43.1103306,
        lng: 12.3909092,
    }
    const defaultProps = {
        center: stops.length > 0 ? JSON.parse(stops[0].location) : defaultCenter,
        zoom: 8,
    };
    return (

        <Card
        title = "Map"
            bodyStyle={{ height: 700 }}
        >
            <Map {...defaultProps} >
                {stops.map((loc) => {
                    return (
                        <MapMarker
                            key={loc.sequence}
                            label={loc.sequence.toString()}
                            position={JSON.parse(loc.location)}
                            icon={{
                                url: "/images/marker-location.svg",
                            }}

                        />
                    );
                })}

            </Map>
        </Card>
    );
};