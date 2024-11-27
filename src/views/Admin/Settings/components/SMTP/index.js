import React, { useEffect } from 'react'
import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
}

const tailLayout = {
    wrapperCol: { span: 24 },
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

const SMTPForm = ({ settings, data }) => {
    const dispatch = useDispatch()
    console.log(settings)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        const dataSystem = {
            smtp: {
                key: values?.key || '',
                from: values?.from || '',
                mail: values?.mail || '',
                host: values?.host || '',
            },
        }

        dispatch(
            setSettings({
                ...settings,
                system: {
                    ...settings.system,
                    ...dataSystem,
                },
            }),
        )
    }

    useEffect(() => {
        form.setFieldsValue({
            key: data?.smtp?.key || '',
            mail: data?.smtp?.mail || '',
            host: data?.smtp?.host || '',
            from: data?.smtp?.from || '',
            token_source: data?.['token-price']?.source || '',
            token_symbol: data?.['token-price']?.symbol || '',
            token_circulating_supply: data?.['token-price']?.circulating_supply || '',
            token_total_supply: data?.['token-price']?.total_supply || '',
            token_token: data?.['token-price']?.token || '',
            token_pair_a: data?.['token-price']?.pair?.a || '',
            token_pair_mr: data?.['token-price']?.pair?.mr || '',
            token_pair_bv: data?.['token-price']?.pair?.bv || '',
        })
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            name="setting-system-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="setting-form setting-system"
        >
            <Form.Item name="host" label="Host">
                <Input />
            </Form.Item>
            <Form.Item name="from" label="From">
                <Input />
            </Form.Item>
            <Form.Item name="mail" label="Mail">
                <Input />
            </Form.Item>
            <Form.Item name="key" label="Key">
                <Input />
            </Form.Item>

            <Form.Item className="form-actions" {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SMTPForm
