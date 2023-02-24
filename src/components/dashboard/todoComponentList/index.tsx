import { CheckCircleFilled, CheckCircleTwoTone, CiCircleTwoTone, CloseCircleTwoTone, EditFilled, HomeFilled, HomeTwoTone, PlusOutlined } from "@ant-design/icons";
import { AntdList, Button, Card, Space, Timeline } from "@pankod/refine-antd";
import { HttpError, useList, useNavigation, useUpdate } from "@pankod/refine-core";
import { JourneyModeContext } from "contexts/journey";
import { IStop, ITodo } from "interfaces";
import { useContext } from "react";

export const TodoCompList: React.FC = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const resourceTodo = "63f851448cf815bc4833";
    const { mutate } = useUpdate();
    const { create } = useNavigation();
    const { data, isLoading, isError } = useList<ITodo, HttpError>({
        resource: resourceTodo,
        config: {

            filters: [
                {
                    field: "journeyId",
                    operator: "eq",
                    value: idJourney
                },
            ],
        }
    });

    const todos = data?.data.map((elem) => {

        let ColorChecked = "#d21404"; //red
        if (elem.complete) {
            ColorChecked = "#52c41a";
        }
        return {
            ...elem,
            ColorChecked: ColorChecked,

        }
    }) ?? [];
    const handleDoneClick = (item: ITodo) => {
        mutate({
            resource: "63f851448cf815bc4833",
            values: {

                complete: true,
            },
            id: item.id,
        });
    };
    const CompleteIcon = ((elem: ITodo) => {
        if (elem.complete) {
            return <CheckCircleTwoTone twoToneColor="#52c41a" />
        } else {
            return <CloseCircleTwoTone twoToneColor="#d21404" />
        }

    });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <Card title="Todo" actions={[
            <PlusOutlined onClick={() => create(resourceTodo)} />
        ]}>


            <AntdList
                pagination={{ position: "bottom", align: "center", pageSize: 8 }}
                dataSource={todos}
                style={{ minHeight: 5 }}
                renderItem={(item) => (
                    <AntdList.Item
                        actions={[
                            <Space>
                                <CompleteIcon id={""} description={""} complete={item.complete} journeyId={""} />
                                <Button
                                    onClick={(event) => handleDoneClick(item)}
                                    disabled={item.complete}
                                >
                                    Done!
                                </Button>
                            </Space>
                        ]}
                    >
                        {item.description}

                    </AntdList.Item>

                )}
            >
            </AntdList>

        </Card>

    );
};