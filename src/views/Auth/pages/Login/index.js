import React, { useState } from 'react'
import { Button, Form, Space } from 'antd'
import Checkbox from 'components/AntCheckbox'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import useAuth from 'hooks/useAuth'
import { Link } from 'components/Link'
import AntInput from 'components/AntInput'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
}

const LoginPage = () => {
  const [form] = Form.useForm()

  const [loginError, setLoginError] = useState()

  const { login } = useAuth()

  const onFinish = (values) => {
    setLoginError('')
    login(
      {
        email: values.email,
        password: values.password,
      },
      () => {},
      (error) => {
        setLoginError(error)
      },
    )
  }

  return (
    <div className="login-page">
      <div className="login-page_header">
        <h1>Welcome back</h1>
        <p>Login to your account</p>
      </div>
      {loginError && <div className="login-page_error-mess text-error">{loginError?.message || ''}</div>}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
        requiredMark="optional"
        className="login-page_form"
      >
        <div className="form_header">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                whitespace: true,
              },
            ]}
            className="login-page_form_item"
          >
            <AntInput placeholder="Enter email" className="login-page_form_item_input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            className="login-page_form_item"
          >
            <AntInput
              type="password"
              placeholder="A confirmation code will be sent to this address"
              className="login-page_form_item_input"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          // rules={[
          //   {
          //     validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
          //   },
          // ]}
          {...tailFormItemLayout}
        >
          <Checkbox className="form-checkbox" style={{ fontSize: '14px', fontWeight: 400 }}>
            Remember & Auto Login
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" className="btn_login">
            Login
          </Button>
          <div className="question">
            <Space size={[12, 12]} direction="vertical">
              <p>
                Don't have an account? <Link href="/register">Click to sign up</Link>
              </p>
              <p>
                <Link href="/forgot">Forgot Password?</Link>
              </p>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

LoginPage.Layout = PublicLayoutBlock
export default LoginPage
