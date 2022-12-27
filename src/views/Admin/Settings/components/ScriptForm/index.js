import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { setSettings } from 'redux/settings/actions'

const { TextArea } = Input

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
}

const ScriptForm = ({ settings, data }) => {
    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const onFinish = (values) => {
        const dataScript = {
            "header": values?.header || "",
            "body": values?.body || "",
            "footer": values?.footer || "",
        }

        dispatch(setSettings({
            ...settings,
            script: dataScript,
        }));
    }

    useEffect(() => {
        form.setFieldsValue(
            {
                header: data?.header || "",
                body: data?.body || "",
                footer: data?.footer || "",
            }
        )
    }, [data])

    return (
        <Form
            {...layout}
            form={form}
            name="setting-script-form"
            onFinish={onFinish}
            className="setting-form setting-script"
        >
            <Form.Item
                name='header'
                label="Header"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name='body'
                label="Body"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name='footer'
                label="Footer"
            >
                <TextArea rows={4} />
            </Form.Item>
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

export default ScriptForm