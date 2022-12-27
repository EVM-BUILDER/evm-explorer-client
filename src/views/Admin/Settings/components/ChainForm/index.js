import React, { useEffect } from 'react'
import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
}

const ChainForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const dataChain = {
            explorer: values?.explorer || "",
            id: values?.id || "",
            name: values?.name || "",
            rpc: values?.rpc || "",
            native: {
                name: values?.native_name || "",
                symbol: values?.native_symbol || "",
                decimals: values?.native_decimals || 18,
                logo: values?.native_logo || "",
            },
        }

        dispatch(setSettings({
            ...settings,
            chain: dataChain,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                explorer: data?.explorer || "",
                id: data?.id || "",
                name: data?.name || "",
                rpc: data?.rpc || "",
                native_name: data?.native?.name || "",
                native_symbol: data?.native?.symbol || "",
                native_decimals: data?.native?.decimals || "",
                native_logo: data?.native?.logo || "",
            }
        )
    }, [data])

    return (
        <Form {...layout}
            form={form}
            name="setting-chain-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="setting-form setting-chain"
        >
            <h3 className='block-title'>Global</h3>
            <Row gutter={24}>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='explorer'
                        label="Explorer"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='id'
                        label="ID"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='name'
                        label="Name"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='rpc'
                        label="Rpc"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <h3 className='block-title'>Native</h3>
            <Row gutter={24}>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='native_decimals'
                        label="Decimals"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='native_logo'
                        label="Logo"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='native_name'
                        label="Name"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='native_symbol'
                        label="Symbol"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                className='form-actions'
            >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChainForm