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
    Button,
} from "@pankod/refine-antd";

import { IStop } from "interfaces";
import { JourneyModeContext } from "contexts/journey";
import { useContext } from "react";
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CloseCircleTwoTone, HomeTwoTone, PlaySquareOutlined, PlusSquareOutlined } from "@ant-design/icons";

/*    
    id?:string;
    name:string;
    sequence:number;
    fromDate?:Date;
    toDate?:Date;
    numberNights?:number;
    location:string;
    complete?:boolean;
    reservation?:boolean;
    journeyId:string; */

export const StopsList: React.FC<IResourceComponentsProps> = (props) => {
    const { idJourney } = useContext(JourneyModeContext);
    const { tableProps, sorter } = useTable<IStop>({
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


    console.log(props);
    return (
        <List
            headerButtons={({ defaultButtons }) => (
                <>

                    <a href={`/${props.name}/create`}>
                        <Button ><PlusSquareOutlined/> Re-Create</Button>

                    </a>
                </>
            )}

        >
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                />
                <Table.Column dataIndex="sequence" title="#" sorter />
                <Table.Column dataIndex="name" title="Name" sorter />
                <Table.Column dataIndex="numberNights" title="# nights" sorter />
                <Table.Column dataIndex="fromDate" title="From date" sorter />
                <Table.Column dataIndex="toDate" title="toDate" sorter />

                <Table.Column<IStop>
                    title="Flags"
                    dataIndex="flags"
                    render={(_, record) => {
                        let ColorComlplete ="#d21404"; //red
                        if(record.complete){
                            ColorComlplete ="#52c41a";
                        }
                        let ColorReservation ="#d21404"; //red
                        if(record.reservation){
                            ColorReservation ="#52c41a";
                        }

                        return (
                        <Space>
                            <HomeTwoTone twoToneColor={ColorReservation}/>
                            <CheckCircleTwoTone twoToneColor={ColorComlplete}/>
                        </Space>
                        )

                    }
                            


}
                />


                {/*                 <Table.Column<IStop>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
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