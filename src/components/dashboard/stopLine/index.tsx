import { Card, Timeline } from "@pankod/refine-antd";
import { HttpError, useList } from "@pankod/refine-core";
import { JourneyModeContext } from "contexts/journey";
import { IStop } from "interfaces";
import { useContext } from "react";

export const JourneyTimeline: React.FC = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const resourceStops = "63eb883cc7b7c2658eaa";
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

    const stopsTimeline = data?.data.map((elem => {
        return {
            color: elem.complete ? "green" : "red",
            children: elem.name,
            label: elem.numberNights + " nights"
        }
    })) ?? [];
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <Card title="Live">
            <Timeline 
            mode="left"
            items={stopsTimeline} 
            >

            </Timeline>
        </Card>

    );
};