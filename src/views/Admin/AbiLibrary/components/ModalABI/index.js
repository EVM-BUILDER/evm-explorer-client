import React from 'react';
import { Button, Form, Modal } from 'antd';
import { TextArea } from 'components/Input';

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
};

const ModalABI = ({ open, onClose, handleAddAbi }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        handleAddAbi(values)
        form.resetFields()
        onClose()
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
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='data'
                    label="Data"
                >
                    <TextArea rows={20} />
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