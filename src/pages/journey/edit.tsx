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
    Edit,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

import { IJourney, IVehicle } from "interfaces";
import { storage, normalizeFile } from "utility";
import { CarOutlined } from "@ant-design/icons";
import { ColorModeContext } from "contexts/color-mode";
import { JourneyModeContext } from "contexts/journey";

const { RangePicker } = DatePicker;

export const JourneyEdit: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps,onFinish } = useForm<IJourney>();

    const { selectProps: vehicleSelectProps } = useSelect<IVehicle>({
        resource: "63ea440ead9b13a8a998",
        optionLabel: "name",
        optionValue: "id",
    });
    //const {idJourney, setIdJourney} = useContext(JourneyModeContext);
    //console.log(idJourney);
    //setIdJourney("EHI");

    const handleOnFinish = (fieldsValue:any) => {
        onFinish({
            name:fieldsValue['name'],
            description:fieldsValue['description'],
            numberTravellers:fieldsValue['numberTravellers'],
            defaultVehicleId:fieldsValue['defaultVehicleId'],
            fromDate: fieldsValue['date'][0],
            toDate: fieldsValue['date'][1],

        });
    };

    return (

        <Edit saveButtonProps={saveButtonProps}>

            <Form {...formProps} onFinish={handleOnFinish} layout="vertical" >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item
                    label="Number of Travelers"
                    name="numberTravellers"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0} max={999} defaultValue={1} />
                </Form.Item>
                <Form.Item
                    label="Default Vehicle"
                    name="defaultVehicleId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...vehicleSelectProps} />
                </Form.Item>
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

        </Edit >
    );
};