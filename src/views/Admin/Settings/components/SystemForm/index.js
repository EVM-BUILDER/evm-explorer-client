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
}

const SystemForm = ({ settings, data }) => {
    const dispatch = useDispatch()
    console.log(settings);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const dataSystem = {
            "smtp": {
                "key": values?.key || "",
                "from": values?.from || "",
                "mail": values?.mail || "",
                "host": values?.host || ""
            },
            "token-price": {
                "source": values?.token_source || "",
                "symbol": values?.token_symbol || "",
                "circulating_supply": values?.token_circulating_supply || 0,
                "total_supply": values?.token_total_supply || 0,
                "token": values?.token_token || "",
                "pair": {
                    "a": values?.token_pair_a || "",
                    "mr": values?.token_pair_mr || "",
                    "bv": values?.token_pair_bv || ""
                }
            }
        }

        dispatch(setSettings({
            ...settings,
            system: dataSystem,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                key: data?.smtp?.key || "",
                mail: data?.smtp?.mail || "",
                host: data?.smtp?.host || "",
                from: data?.smtp?.from || "",
                token_source: data?.["token-price"]?.source || "",
                token_symbol: data?.["token-price"]?.symbol || "",
                token_circulating_supply: data?.["token-price"]?.circulating_supply || "",
                token_total_supply: data?.["token-price"]?.total_supply || "",
                token_token: data?.["token-price"]?.token || "",
                token_pair_a: data?.["token-price"]?.pair?.a || "",
                token_pair_mr: data?.["token-price"]?.pair?.mr || "",
                token_pair_bv: data?.["token-price"]?.pair?.bv || "",
            }
        )
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
            <h3 className='block-title'>SMTP</h3>
            <Form.Item
                name='host'
                label="Host"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='from'
                label="From"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='mail'
                label="Mail"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='key'
                label="Key"
            >
                <Input />
            </Form.Item>
            <h3 className='block-title'>Token Price</h3>
            <Form.Item
                name='token_source'
                label="Source"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='token_symbol'
                label="Symbol"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='token_circulating_supply'
                label="Circulating Supply"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name='token_total_supply'
                label="Total Supply"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name='token_token'
                label="Token"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='token_pair_a'
                label="Pair A"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='token_pair_mr'
                label="Pair MR"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='token_pair_bv'
                label="Pair BV"
            >
                <Input />
            </Form.Item>
            <Form.Item
                className='form-actions'
                {...tailLayout}
            >
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SystemForm