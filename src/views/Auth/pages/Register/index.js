import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'antd'
import Checkbox from 'components/AntCheckbox'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import useAuth from 'hooks/useAuth'
import { Link } from 'components/Link'
import AntInput from 'components/AntInput'
import VerifyCode from 'views/Auth/components/VerifyCode'

const STEP = {
  REGISTER: 1,
  VERIFY_CODE: 2,
}

const Register = () => {
  const [form] = Form.useForm()

  const { register } = useAuth()

  const [step, setStep] = useState(STEP.REGISTER)
  const [errorMess, setErrorMess] = useState()

  function submitForm(values) {
    setErrorMess('')
    if (values.password !== values.password_confirm) return
    register(
      {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      () => {
        setStep(STEP.VERIFY_CODE)
      },
      (error) => {
        setErrorMess(error?.message)
      },
    )
  }

  if (step === STEP.VERIFY_CODE) {
    return <VerifyCode email={form.getFieldValue('email')} />
  }
  return (
    <div className="register-page">
      <div className="register-page_header">
        <h1>Register a New Account</h1>
        <p>Fill out the form to get started.</p>
      </div>
      {errorMess && <div className="login-page_error-mess text-error">{errorMess}</div>}

      <div className="register-page_content">
        <Form
          form={form}
          method="POST"
          name="register"
          scrollToFirstError
          layout="vertical"
          requiredMark="optional"
          className="register-page_form"
          onFinish={submitForm}
          // initialValues={{
          //   username: 'ngohung1@qa.team',
          //   email: 'ngohung1@qa.team',
          //   email_confirm: 'ngohung1@qa.team',
          //   password: 'ngohung1@qa.team',
          //   password_confirm: 'ngohung1@qa.team',
          // }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
            className="register-page_form_item"
          >
            <AntInput
              placeholder="Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed."
              className="register-page_form_item_input"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
            className="register-page_form_item"
          >
            <AntInput placeholder="A confirmation code will be sent to this address" className="register-page_form_item_input" />
          </Form.Item>
          <Form.Item
            name="email_confirm"
            label="Confirm Email Address"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
                whitespace: true,
              },
            ]}
            className="register-page_form_item"
          >
            <AntInput placeholder="Re-enter your email address" className="register-page_form_item_input" />
          </Form.Item>

          <Row
            gutter={[
              { xs: 12, sm: 24 },
              { xs: 12, sm: 24 },
            ]}
          >
            <Col xs={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                    whitespace: true,
                  },
                ]}
                className="register-page_form_item"
              >
                {/* <br/> */}
                <AntInput type="password" className="register-page_form_item_input" />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                name="password_confirm"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: 'Confirm Password!',
                    whitespace: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'))
                    },
                  }),
                ]}
                className="register-page_form_item"
              >
                <AntInput type="password" className="register-page_form_item_input" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="agree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
              },
            ]}
          >
            <Checkbox>I agree to the Terms and Conditions</Checkbox>
          </Form.Item>

          {/* <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
              },
            ]}
          >
            <Checkbox style={{ fontSize: '14px', fontWeight: 400 }}>
              I agree to receive the Etherscan newsletter and understand that I can unsubscribe at any time.
            </Checkbox>
          </Form.Item> */}

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" className="btn_register">
              Create an Account
            </Button>
            <div className="question">
              <p>
                Already have an account?{` `}
                <span>
                  <Link href="/login">Click to sign in</Link>
                </span>
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

Register.Layout = PublicLayoutBlock
export default Register
