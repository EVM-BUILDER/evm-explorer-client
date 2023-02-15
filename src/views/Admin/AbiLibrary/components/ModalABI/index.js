import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const ModalABI = ({ open, onClose, handleAddAbi }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleAddAbi(values)
        form.resetFields()
        setTimeout(() => {
            onClose()
        }, 1000)
    };

    return (
        <Modal
            forceRender 
            title='Add ABI'
            width="800px"
            onCancel={onClose}
            open={open}
            footer={null}
        >
            <Form
                {...layout}
                name="abis-form"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name='data'
                    label="Data"
                >
                    <TextArea rows="10" />
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

export default ModalABI;