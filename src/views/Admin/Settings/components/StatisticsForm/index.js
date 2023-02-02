import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
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

const StatisticsForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const dataStatistics = {
            ...values
        }

        console.log(dataStatistics);

        dispatch(setSettings({
            ...settings,
            statistics: dataStatistics,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                icon_price: data?.icon_price || "",
                icon_transactions: data?.icon_transactions || "",
                icon_market_cap: data?.icon_market_cap || "",
                icon_block: data?.icon_block || "",
            }
        )
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            name="setting-global-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            className="setting-form setting-global"
        >
            <Form.Item
                name='icon_price'
                label="Icon Price"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='icon_transactions'
                label="Icon Transactions"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='icon_market_cap'
                label="Icon Market Cap"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='icon_block'
                label="Icon Block"
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

export default StatisticsForm