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

import { IJourney, IRoute, IStop, IVehicle } from "interfaces";
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { useContext } from "react";
import { JourneyModeContext } from "contexts/journey";

/* 
    id?:string;
    fromStopId:string; 
    toStopId:string; 
    vehicleId:string;
    km:string;
    time:string;
    journeyId:string;
    */

export const RoutesList: React.FC<IResourceComponentsProps> = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const { tableProps, sorter } = useTable<IRoute>({
        initialSorter: [
            {
                field: "$id",
                order: "asc",
            },

        ],
        permanentFilter: [
            {
                field: "journeyId",
                operator: "eq",
                value: idJourney
            },
        ],
    });


    const fromStopIds = tableProps?.dataSource?.map((item) => item.fromStopId) ?? [];
    const toStopIds = tableProps?.dataSource?.map((item) => item.toStopId) ?? [];
    const stopsIds = [...fromStopIds, ...toStopIds];
    console.log(stopsIds);
    const { data, isLoading } = useMany<IStop>({
        resource: "63eb883cc7b7c2658eaa",
        ids: stopsIds,
        queryOptions: {
            enabled: stopsIds.length > 0,
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
                <Table.Column
                    dataIndex="fromStopId"
                    title="From"
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
                    dataIndex="toStopId"
                    title="To"
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
                <Table.Column dataIndex="km" title="Km" sorter />
                <Table.Column dataIndex="time" title="Travel time" sorter />


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