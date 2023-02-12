import React from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from 'views/Admin/WPageAdmin'
import { Button, Form, Input } from 'antd'
import { TextArea } from 'components/Input'

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

const SendMail = () => {
  const [form] = Form.useForm();

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
  ]

  const onFinish = (values) => {
    console.log(values)
    form.resetFields()
  };

  return (
    <WPageAdmin>
      <Breadcrumb listItems={breadcrumb} />
      <h2>Send Mail</h2>
      <Form
                {...layout}
                name="send-mail-form"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item
                    name='subject'
                    label="Subject"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='message'
                    label="Message"
                >
                    <TextArea rows={10} />
                </Form.Item>
                <Form.Item className='form-actions'>
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>
            </Form>
    </WPageAdmin>
  )
}

SendMail.Layout = AdminLayout

export default SendMail
