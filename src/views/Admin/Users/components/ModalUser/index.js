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

const ModalUser = ({ open, onClose, handleUpdateUser, currentUser }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleUpdateUser(values)
        form.resetFields()
        onClose()
    };

    useEffect(() => {
        form.setFieldsValue(
            {
                email: currentUser?.email || "",
                role: currentUser?.role || "",
                status: currentUser?.status || "",
            }
        )
    }, [currentUser])

    return (
        <Modal
            forceRender 
            title='User'
            width="500px"
            onCancel={onClose}
            open={open}
            footer={null}
        >
            <Form
                {...layout}
                name="user-form"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
                initialValues={{role: 'user', status: 'active'}}
            >
                <Form.Item
                    name='email'
                    label="Email"
                >
                    <Input disabled={currentUser?.email ? true : false} />
                </Form.Item>
                <Form.Item
                    name='role'
                    label='Role'
                >
                    <Select
                        options={[
                            {
                                value: 'user',
                                label: 'user',
                            },
                            {
                                value: 'admin',
                                label: 'admin',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name='status'
                    label='Status'
                >
                    <Select
                        options={[
                            {
                                value: 'active',
                                label: 'active',
                            },
                            {
                                value: 'deactive',
                                label: 'deactive',
                            },
                        ]}
                    />
                </Form.Item>
                {/* <Form.Item
                    name='subscribe'
                    label="Subscribe"
                >
                    <Select
                        defaultValue='false'
                        options={[
                            {
                                value: 'false',
                                label: 'No',
                            },
                            {
                                value: 'true',
                                label: 'Yes',
                            },
                        ]}
                    />
                </Form.Item> */}
                <Form.Item className='form-actions'>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default ModalUser;