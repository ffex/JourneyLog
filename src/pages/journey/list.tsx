import { useMany, IResourceComponentsProps } from "@pankod/refine-core";
import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    getDefaultSortOrder,
} from "@pankod/refine-antd";

import { IJourney, IVehicle } from "interfaces";
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CloseCircleTwoTone } from "@ant-design/icons";

/* id:string;
    name:string;
    description?:string;
    numberTravellers:number;
    complete:boolean;
    fromVehicleId:string;
    toVehicleId:string;
    defaultVehicleId:string;
    fromDate:Date;
    toDate:Date; 
    
    export interface IVehicle{
    id:string;
    name:string;
    icon:string;

}
    */

export const JourneysList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IJourney>({
        initialSorter: [
            {
                field: "$id",
                order: "asc",
            },
        ],
    });

    const defaultVehicleIds =tableProps?.dataSource?.map((item) => item.defaultVehicleId) ?? [];
    const fromVehicleIds =tableProps?.dataSource?.map((item) => item.fromVehicleId) ?? [];
    const toVehicleIds =tableProps?.dataSource?.map((item) => item.toVehicleId) ?? [];
    const vehicleIds = [...defaultVehicleIds,...fromVehicleIds,...toVehicleIds];
    console.log(vehicleIds);
    const { data, isLoading } = useMany<IVehicle>({
        resource: "63ea440ead9b13a8a998",
        ids: vehicleIds,
        queryOptions: {
            enabled: vehicleIds.length > 0,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    
                />
                <Table.Column dataIndex="name" title="Name" sorter />
                <Table.Column dataIndex="numberTravellers" title="Travellers" sorter />
                <Table.Column dataIndex="fromDate" title="From date" sorter />
                <Table.Column dataIndex="toDate" title="To date" sorter />

                <Table.Column
                    dataIndex="defaultVehicleId"
                    title="Default Vehicle"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column
                    dataIndex="fromVehicleId"
                    title="Start journey with"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column
                    dataIndex="toVehicleId"
                    title="Return home with"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.name
                                }
                            />
                        );
                    }}
                />
                <Table.Column 
                dataIndex="complete"
                title="Complete" 
                render={(value) =>{
                    if(value){
                        return <CheckCircleTwoTone twoToneColor="#52c41a"/>
                    }else{
                        return <CloseCircleTwoTone twoToneColor="#d21404"/>
                    }
                }}
                />
{/*                 <Table.Column<IJourney>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                /> */}
            </Table>
        </List>
    );
};