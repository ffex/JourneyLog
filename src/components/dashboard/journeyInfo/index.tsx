import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Card, Col, Collapse, Descriptions, Form, Input, Row, Select, Typography, useForm, useSelect } from "@pankod/refine-antd";
import { useNavigation, useOne } from "@pankod/refine-core";
import { JourneyModeContext } from "contexts/journey";
import { IJourney } from "interfaces";
import { useContext } from "react";

const { Text } = Typography;
const { Panel } = Collapse;

export const JourneyInfo: React.FC = () => {
    const { idJourney, setIdJourney } = useContext(JourneyModeContext);
    const resourceJourney = "63ea42a11ee566d4a63d";
    const { selectProps: journeySelectProps } = useSelect<IJourney>({
        resource: resourceJourney,
        optionLabel: "name",
        optionValue: "id",
    });
    const { data, isLoading, isError } = useOne<IJourney>({
        resource: resourceJourney,
        id: idJourney
    });
    const { create, edit } = useNavigation();
    const journey = data?.data;
    const handleChange = (value: string) => {
        setIdJourney(value);
    };

    return (
        <>
            <Card title="Journey info">

                <Text>Journey Selected: </Text>
                <Select
                    options={journeySelectProps.options}
                    defaultValue={idJourney}
                    style={{ width: 500 }}
                    onChange={handleChange} />
                <Button onClick={() => create(resourceJourney)} icon={<PlusSquareOutlined />}>Journey</Button>
                <Collapse ghost>
                    <Panel header="Journey info" key="1" extra={<EditOutlined onClick={() => edit(resourceJourney, idJourney)} />}>

                        <Descriptions >
                            <Descriptions.Item label="Name">{isLoading ? "Loading..." : journey!.name}</Descriptions.Item>
                            <Descriptions.Item label="Description">{isLoading ? "Loading..." : journey!.description}</Descriptions.Item>
                            <Descriptions.Item label="# Travellers">{isLoading ? "Loading..." : journey!.numberTravellers}</Descriptions.Item>
                            <Descriptions.Item label="From date">{isLoading ? "Loading..." : new Date(journey!.fromDate).toLocaleDateString("en-US")}</Descriptions.Item>
                            <Descriptions.Item label="From date">{isLoading ? "Loading..." : new Date(journey!.toDate).toLocaleDateString("en-US")}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse>

            </Card>
        </>
    );
};
/* 

    complete:boolean;
    fromVehicleId:string;
    toVehicleId:string;
    defaultVehicleId:string;
     */