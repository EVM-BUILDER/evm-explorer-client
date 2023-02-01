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

const GlobalForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    const onFinish = async (values) => {
        const dataGlobal = {
            ...values,
        }

        dispatch(
            setSettings({
                ...settings,
                ...dataGlobal,
            }),
        )
    }

    useEffect(() => {
        form.setFieldsValue({
            logo: data?.logo || '',
            logotext: data?.logotext || '',
            favicon: data?.favicon || '',
            ogimage: data?.ogimage || '',
            sitename: data?.sitename || '',
            sitedescription: data?.sitedescription || '',
            graphicimg: data?.graphicimg || '',
            ggtag: data?.ggtag || '',
        })
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
            <Form.Item name="logo" label="Logo">
                <Input />
            </Form.Item>
            <Form.Item name="logotext" label="Logo Text">
                <Input />
            </Form.Item>
            <Form.Item name="favicon" label="Favicon">
                <Input />
            </Form.Item>
            <Form.Item name="ogimage" label="OG image">
                <Input />
            </Form.Item>
            <Form.Item name="sitename" label="Site Name">
                <Input />
            </Form.Item>
            <Form.Item name="sitedescription" label="Site Description">
                <Input />
            </Form.Item>
            <Form.Item name="graphicimg" label="Graphic Image">
                <Input />
            </Form.Item>
            <Form.Item name="ggtag" label="Google tag">
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

export default GlobalForm
