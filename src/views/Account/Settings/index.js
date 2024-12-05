import React from 'react'
import { Row, Col, Checkbox, Button, Input, Form } from 'antd'

import AccountSidebar from 'components/AccountSidebar'
import Breadcrumb from 'components/Breadcrumb'
import { useSelector } from 'react-redux'

const breadcrumb = [
    {
        link: '/',
        title: 'Home',
    },
    {
        link: '',
        title: 'Account Setting',
        isCurrent: true,
    },
]

const SettingModule = () => {
    const handleNewsletter = (value) => {
        console.log(value)
    }

    const [formInfo] = Form.useForm()
    const [formPassword] = Form.useForm()
    const [formDelete] = Form.useForm()

    const submitFormInfo = (values) => {
        console.log(values)
    }

    const submitFormPassword = (values) => {
        console.log(values)
    }

    const submitFormDelete = (values) => {
        console.log(values)
    }
    const { settings } = useSelector((state) => state.Settings)

    return (
        <div className="account-wrapper UserSetting">
            <div className="container">
                <div className="account-heading">
                    <h1>Account Setting</h1>
                </div>
                <Breadcrumb listItems={breadcrumb} />
                <div className="account-inner">
                    <AccountSidebar active="settings" />
                    <div className="account-content">
                        <div className="block-info person-info">
                            <h2 className="block-title">User Settings</h2>
                            <div className="block-content">
                                <p className="info-desc">
                                    Below are the username, email and overview information for your account.
                                </p>
                                <Form
                                    form={formInfo}
                                    method="POST"
                                    name="change-info"
                                    scrollToFirstError
                                    layout="vertical"
                                    requiredMark="optional"
                                    className="change-info-form"
                                    onFinish={submitFormInfo}
                                >
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <img src="/images/account/email.svg" alt="" />
                                            <span>Your Email Address</span>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <Input placeholder="Email" value="huyette300399@gmail.com" />
                                        </Col>
                                    </Row>
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <img src="/images/account/newsletter.svg" alt="" />
                                            <span>Newsletter</span>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <Checkbox onChange={handleNewsletter}>
                                                Subscribe to Newsletter <br />
                                                {settings?.sitename}'s monthly newsletter brings you the latest features,
                                                analyses, trending stories, community contributions, job listings and giveaways !
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} className="text-right">
                                            <Button className="btn-cancel">Cancel</Button>
                                            <Button className="btn-save" htmlType="submit">
                                                Save Changes
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>

                        <div className="block-info person-info">
                            <h2 className="block-title">Password</h2>
                            <div className="block-content">
                                <p className="info-desc">Edit the fields below to update your password.</p>
                                <Form
                                    form={formPassword}
                                    method="POST"
                                    name="change-password"
                                    scrollToFirstError
                                    layout="vertical"
                                    requiredMark="optional"
                                    className="change-password-form"
                                    onFinish={submitFormPassword}
                                >
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <img src="/images/account/lock.svg" alt="" />
                                            <span>Enter OLD Password</span>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <Form.Item
                                                name="old-password"
                                                rules={[
                                                    {
                                                        validator: (_, value) =>
                                                            value
                                                                ? Promise.resolve()
                                                                : Promise.reject(new Error('Please enter OLD Password!')),
                                                    },
                                                ]}
                                            >
                                                <Input type="password" placeholder="Password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <img src="/images/account/lock.svg" alt="" />
                                            <span>Enter NEW Password</span>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <Form.Item
                                                name="new-password"
                                                rules={[
                                                    {
                                                        validator: (_, value) =>
                                                            value
                                                                ? Promise.resolve()
                                                                : Promise.reject(new Error('Please enter NEW Password!')),
                                                    },
                                                ]}
                                            >
                                                <Input type="password" placeholder="Password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <img src="/images/account/lock.svg" alt="" />
                                            <span>Re-Confirm Password</span>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                            <Form.Item
                                                name="confirm-password"
                                                rules={[
                                                    {
                                                        validator: (_, value) =>
                                                            value
                                                                ? Promise.resolve()
                                                                : Promise.reject(new Error('Please enter Confirm Password!')),
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('new-password') === value) {
                                                                return Promise.resolve()
                                                            }
                                                            return Promise.reject(
                                                                new Error('The confirm passwords that you entered do not match!'),
                                                            )
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input type="password" placeholder="Confirm Password" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 24 }} className="text-right">
                                            <Button className="btn-cancel">Cancel</Button>
                                            <Button className="btn-save" htmlType="submit">
                                                Save Changes
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>

                        <div className="block-info person-info">
                            <h2 className="block-title">Delete Account</h2>
                            <div className="block-content">
                                <p>
                                    <b>Are you sure you want to permanently delete your user account ?</b>
                                </p>
                                <p>
                                    Deleting your user account will also delete all the watchlists, transaction notes, private
                                    tags and verified addresses ownership. Recovery of the above is not possible upon delete
                                    confirmation.
                                </p>
                                <Form
                                    form={formDelete}
                                    method="POST"
                                    name="delete-account"
                                    scrollToFirstError
                                    layout="vertical"
                                    requiredMark="optional"
                                    className="delete-account-form"
                                    onFinish={submitFormDelete}
                                >
                                    <Row className="info-item">
                                        <Col xs={{ span: 24 }} md={{ span: 16 }} className="confirm-delete">
                                            <Form.Item
                                                name="confirm"
                                                valuePropName="checked"
                                                rules={[
                                                    {
                                                        validator: (_, value) =>
                                                            value
                                                                ? Promise.resolve()
                                                                : Promise.reject(new Error('Please check confirm checkbox!')),
                                                    },
                                                ]}
                                            >
                                                <Checkbox onChange={handleNewsletter}>
                                                    Confirm that I want to delete my account.
                                                </Checkbox>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={{ span: 24 }} md={{ span: 8 }} className="text-right">
                                            <Button className="btn-delete" htmlType="submit">
                                                Delete Account
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingModule
