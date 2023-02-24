import { useContext, useState } from "react";

import { IResourceComponentsProps, useCreate } from "@pankod/refine-core";
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
    DatePicker,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IJourney, ITodo, IVehicle } from "interfaces";
import { storage, normalizeFile } from "utility";
import { CarOutlined } from "@ant-design/icons";
import { ColorModeContext } from "contexts/color-mode";
import { JourneyModeContext } from "contexts/journey";

const { RangePicker } = DatePicker;

export const TodoCreate: React.FC<IResourceComponentsProps> = () => {
    const { idJourney } = useContext(JourneyModeContext);
    const { formProps, saveButtonProps, onFinish } = useForm<ITodo>();

    //const {idJourney, setIdJourney} = useContext(JourneyModeContext);
    //console.log(idJourney);
    //setIdJourney("EHI");

    const handleOnFinish = (fieldsValue: any) => {
        onFinish({
            description: fieldsValue['description'],
            complete:false,
            journeyId: idJourney

        });
    };

    return (

        <Create saveButtonProps={saveButtonProps} breadcrumb={null}>

            <Form {...formProps} onFinish={handleOnFinish} layout="vertical" >
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>



                {/* <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item>
                <Form.Item label="Images">
                    <Form.Item
                        name="images"
                        valuePropName="fileList"
                        normalize={normalizeFile}
                        noStyle
                    >
                        <Upload.Dragger
                            name="file"
                            listType="picture"
                            multiple
                            customRequest={async ({
                                file,
                                onError,
                                onSuccess,
                            }) => {
                                try {
                                    const rcFile = file as RcFile;

                                    const { $id } = await storage.createFile(
                                        "default",
                                        rcFile.name,
                                        rcFile,
                                    );

                                    const url = storage.getFileView(
                                        "default",
                                        $id,
                                    );

                                    onSuccess?.({ url }, new XMLHttpRequest());
                                } catch (error) {
                                    onError?.(new Error("Upload Error"));
                                }
                            }}
                        >
                            <p className="ant-upload-text">
                                Drag &amp; drop a file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item> */}
            </Form>

        </Create >
    );
};