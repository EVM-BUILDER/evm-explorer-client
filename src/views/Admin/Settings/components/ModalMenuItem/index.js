import React, { useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import generateUUID from 'utils/generateUUID';

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const ModalMenuItem = ({ open, onClose, handleUpdateMenu, parentMenuId, currentMenuItem, haveImage = false }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const dataMenuItem = {
            ...values,
            id: currentMenuItem?.id || generateUUID(),
            showBorder: values?.showBorder === 1 ? true : false,
            parentMenuId,
        }
        const isUpdate = currentMenuItem?.id ? true : false
        handleUpdateMenu(dataMenuItem, isUpdate)
        form.resetFields()
        onClose()
    };

    useEffect(() => {
        form.setFieldsValue(
            {
                title: currentMenuItem?.title || "",
                url: currentMenuItem?.url || "",
                target: currentMenuItem?.target || "",
                showBorder: currentMenuItem?.showBorder === true ? 1 : 0,
                order: currentMenuItem?.order || 0,
                image: currentMenuItem?.image || "",
            }
        )
    }, [currentMenuItem])

    return (
        <Modal
            title='Menu Item'
            width="500px"
            onCancel={onClose}
            open={open}
            footer={null}
        >
            <Form
                {...layout}
                name="menu-item-form"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='title'
                    label="Title"
                >
                    <Input />
                </Form.Item>
                {haveImage && (
                    <Form.Item
                        name='image'
                        label="Image"
                    >
                        <Input />
                    </Form.Item>
                )}
                <Form.Item
                    name='url'
                    label="Url"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='target'
                    label="Target"
                >
                    <Select
                        defaultValue=''
                        options={[
                            {
                                value: '',
                                label: '',
                            },
                            {
                                value: '_blank',
                                label: '_blank',
                            },
                            {
                                value: '_self',
                                label: '_self',
                            },
                            {
                                value: '_parent',
                                label: '_parent',
                            },
                            {
                                value: '_top',
                                label: '_top',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name='showBorder'
                    label="Show Border"
                >
                    <Select
                        defaultValue={1}
                        options={[
                            {
                                value: 1,
                                label: 'True',
                            },
                            {
                                value: 0,
                                label: 'False',
                            },
                        ]}
                    />

                </Form.Item>
                <Form.Item
                    name='order'
                    label="Order"
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item className='form-actions'>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default ModalMenuItem;