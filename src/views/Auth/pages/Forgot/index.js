import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'antd'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import { Link } from 'components/Link'
import AntInput from 'components/AntInput'
import useAuth from 'hooks/useAuth'
import { getOTP } from 'redux/auth/actions'

const FORGOT_STEP = {
  GETOTP: 1,
  FORGOT: 2,
}

const Forgot = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [step, setStep] = useState(FORGOT_STEP.GETOTP)
  const [requestOtpResult, setRequestOtpResult] = useState()
  const [errorMess, setErrorMess] = useState('')
  const [infoMess, setInfoMess] = useState('')

  const { forgot } = useAuth()

  const onFinish = (values) => {
    setErrorMess('')
    setInfoMess('')

    switch (step) {
      case FORGOT_STEP.GETOTP:
        dispatch(
          getOTP(
            values,
            (result) => {
              setRequestOtpResult(result)
              setInfoMess('Please get code from email!')
              setStep(FORGOT_STEP.FORGOT)
            },
            (error) => {
              setErrorMess(error?.message || 'Error!')
            },
          ),
        )
        break
      case FORGOT_STEP.FORGOT:
        forgot(
          values,
          (result) => {
            setRequestOtpResult(result)
            setInfoMess('Please get code from email!')
            setStep(2)
          },
          (error) => {
            setErrorMess(error?.message || 'Error!')
          },
        )
        break

      default:
        break
    }
  }

  return (
    <div className="forgot-page">
      <div className="forgot-page_header">
        <h1>Forgot your password?</h1>
        <p>Enter your email address below and we'll get you back on track.</p>
      </div>
      {errorMess && <div className={`text-error`}>{errorMess}</div>}
      {infoMess && <div className={`text-warning`}>{infoMess}</div>}
      <Form
        form={form}
        name="forgot"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
        requiredMark="optional"
        className="forgot-page_form"
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              whitespace: true,
            },
          ]}
          className="forgot-page_form_item"
        >
          <AntInput className="forgot-page_form_item_input" placeholder="Email" readOnly={Boolean(requestOtpResult)} />
        </Form.Item>

        {step === FORGOT_STEP.FORGOT && (
          <>
            <Form.Item
              name="newPassword"
              label="New password"
              rules={[
                {
                  required: true,
                  message: 'Please enter new password!',
                  whitespace: true,
                },
              ]}
              className="forgot-page_form_item"
            >
              <AntInput placeholder="New password" type="password" className="forgot-page_form_item_input" />
            </Form.Item>
            <Form.Item
              name="code"
              label="Email code"
              rules={[
                {
                  required: true,
                  message: 'Please enter code from email!',
                  whitespace: true,
                },
              ]}
              className="forgot-page_form_item"
            >
              <AntInput placeholder="Email code" className="forgot-page_form_item_input" />
            </Form.Item>
          </>
        )}

        <Form.Item style={{ textAlign: 'center', marginTop: '48px' }}>
          <Button type="primary" htmlType="submit" className="btn_forgot">
            Reset Password
          </Button>
          <div className="question">
            <Link href="/login">Back to sign in</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

Forgot.Layout = PublicLayoutBlock
export default Forgot
