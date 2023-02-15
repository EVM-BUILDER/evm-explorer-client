import React, { useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import Breadcrumb from 'components/Breadcrumb'
import WPageAdmin from 'views/Admin/WPageAdmin'
import { Button, Checkbox, Form, Input } from 'antd'

import CKEditor from 'components/CKEditor'
import { useDispatch } from 'react-redux'
import { sendMailUsersFromApi } from 'redux/users/saga'

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
}

const SendMail = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [messageContent, setMessageContent] = useState(' ')
  const [sendAll, setSendAll] = useState(true)

  const breadcrumb = [
    {
      link: '/admin',
      title: 'Dashboard',
    },
    {
      link: "/admin/communication/sendmail",
      title: "Send Mail",
      isCurrent: true,
    }
  ]

  const onFinish = async (values) => {
    const dataSendMail = {
      ...values,
      message: messageContent,
    }
    const sendMail = await sendMailUsersFromApi(dataSendMail);
    form.resetFields()
  }

  const handleChangeMessage = (data) => {
    setMessageContent(data)
  }

  const handleSendAll = () => {
    setSendAll((sendAll) => !sendAll)
  }

  return (
    <WPageAdmin>
      <div className='send-mail-wrapper'>
        <Breadcrumb listItems={breadcrumb} />
        <h2>Send Mail</h2>
        <Form
            {...layout}
            name='send-mail-form'
            onFinish={onFinish}
            validateMessages={validateMessages}
            form={form}
            className='send-mail-form'
        >
            <Checkbox onChange={handleSendAll} checked={sendAll}>
              Send to all users
            </Checkbox>
            <Form.Item
                name='subject'
                label="Subject"
            >
                <Input />
            </Form.Item>
            {!sendAll && (
            <Form.Item
                name='email'
                label="Email"
            >
                <Input />
            </Form.Item>
            )}
            <Form.Item
                name='message'
                label="Message"
            >
                <CKEditor
                    onChange={handleChangeMessage}
                />
            </Form.Item>
            <Form.Item className='form-actions'>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
      </div>
    </WPageAdmin>
  )
}

SendMail.Layout = AdminLayout

export default SendMail
