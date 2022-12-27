import React, { useEffect } from 'react'
import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'
import { toast } from 'react-toastify'

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

const GlobalForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const dataGlobal = {
            ...values
        }

        dispatch(setSettings({
            ...settings,
            ...dataGlobal,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                logo: data?.logo || "",
                favicon: data?.favicon || "",
                ogimage: data?.ogimage || "",
                sitename: data?.sitename || "",
                sitedescription: data?.sitedescription || "",
                graphicimg: data?.graphicimg || "",
                ggtag: data?.ggtag || "",
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
            <Row gutter={24}>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='logo'
                        label="Logo"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='favicon'
                        label="Favicon"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='ogimage'
                        label="OG image"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='sitename'
                        label="Site Name"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='sitedescription'
                        label="Site Description"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='graphicimg'
                        label="Graphic Image"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} md={12} lg={8}>
                    <Form.Item
                        name='ggtag'
                        label="Google tag"
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

export default GlobalForm