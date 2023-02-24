import { useMany, IResourceComponentsProps, useForm, useUpdate } from "@pankod/refine-core";
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

import { IJourney, ITodo, IVehicle } from "interfaces";
import { CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { useContext } from "react";
import { JourneyModeContext } from "contexts/journey";


export const TodosList: React.FC<IResourceComponentsProps> = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const { mutate } = useUpdate();
    const { tableProps, sorter } = useTable<ITodo>({
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
    const handleDoneClick =((id:string)=>{
        mutate({
            resource: "63f851448cf815bc4833",
            values: {
                
                complete: true,
            },
            id: id,
        });
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
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
                <Table.Column dataIndex="description" title="Description" sorter />
                

                 <Table.Column<ITodo>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <Button   
                                onClick={()=>handleDoneClick(record.id)}
                            >
                                Done!
                            </Button>
                        </Space>
                    )}
                /> 
            </Table>
        </List>
    );
};