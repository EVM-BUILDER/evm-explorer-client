import React, { useState } from 'react'
import { Button, Form } from 'antd'
import { useRouter } from 'next/router'
import useAuth from 'hooks/useAuth'
import { Link } from 'components/Link'
import AntInput from 'components/AntInput'

const VerifyCode = ({ email }) => {
    const router = useRouter()
    const [form] = Form.useForm()

    const { verifyEmail } = useAuth()

    const [errorMess, setErrorMess] = useState()

    function submitForm(values) {
        setErrorMess('')
        if (!email) {
            router.push('/register')
            return
        }
        verifyEmail(
            {
                email: values.email,
                code: values.code,
            },
            () => {
                router.push('/login')
            },
            (error) => {
                setErrorMess(error?.message)
            },
        )
    }

    return (
        <div className="verify-page">
            <div className="verify-page_header">
                <h1>Verify Account</h1>
                <p>Get code from email</p>
            </div>
            {errorMess && <div className="login-page_error-mess text-error">{errorMess}</div>}

            <div className="verify-page_content">
                <Form
                    form={form}
                    method="POST"
                    name="verify"
                    scrollToFirstError
                    layout="vertical"
                    requiredMark="optional"
                    className="verify-page_form"
                    onFinish={submitForm}
                    initialValues={{
                        email,
                    }}
                >
                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input email!',
                                whitespace: true,
                            },
                        ]}
                        className="verify-page_form_item"
                    >
                        <AntInput placeholder="Email" className="verify-page_form_item_input" />
                    </Form.Item>

                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input code!',
                                whitespace: true,
                            },
                        ]}
                        className="verify-page_form_item"
                    >
                        <AntInput placeholder="Code" className="verify-page_form_item_input" />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit" className="btn_verify">
                            Submit
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

export default VerifyCode
