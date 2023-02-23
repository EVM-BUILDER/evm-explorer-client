import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import * as Yup from 'yup'
import { get } from 'lodash'
import styled from 'styled-components'
import CardOverview from '../CardOverview'
import { useForm } from 'components/Form/useForm'
import { Regex } from 'utils/regex.utils'
import { InputText, InputWrapper, TextArea } from 'components/Input'
import { useUser } from 'redux/user/hooks'
import { TAB_ACCOUNT_LINK } from 'views/MyAccount/accountConfig'
import { getProfile } from 'redux/user/actions'
import { useDispatch, useSelector } from 'react-redux'

const PulsescanConnect = ({ onChangeTab }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.User)

    const [submitMess, setSubmitMess] = useState({
        status: null,
        message: '',
    })

    const { updateProfile } = useUser()

    const handleCancel = () => {
        onChangeTab(TAB_ACCOUNT_LINK.overview)
    }

    const { handleSubmit, getInputProps, isSubmitting } = useForm({
        enableReinitialize: true,
        structure: [
            {
                name: 'avatar',
            },
            {
                name: 'username',
                validate: Yup.string().required('Required'),
                defaultValue: get(userInfo, 'profile.username', ''),
            },
            {
                name: 'website',
                validate: Yup.string().test({
                    message: 'Link is not valid',
                    test: function (value) {
                        if (!value) return true
                        if (Regex.url.test(value)) return true
                        return false
                    },
                }),
                defaultValue: get(userInfo, 'profile.website', ''),
            },
            {
                name: 'bio',
                // validate: Yup.string().required('Require'),
                defaultValue: get(userInfo, 'profile.bio', ''),
            },
        ],
        onSubmit: async (values) => {
            updateProfile(
                values,
                () => {
                    dispatch(getProfile())
                    setSubmitMess({ status: true, message: 'Profile updated successfully' })
                },
                (error) => {
                    setSubmitMess({ status: false, message: error?.message || 'Error' })
                },
            )
        },
    })

    return (
        <CardOverview className="pulsescan" title={'Public Profile Info'} status={submitMess.status} message={submitMess.message}>
            <p className="description">
                Your Public Profile information is shared publicly. Please DO NOT enter sensitive information such as your private
                keys here.
            </p>
            <div className="overview_info_content pulsescan_content">
                <div className="pulsescan_content_top">
                    <div className="pulsescan_content_top_username">
                        <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="left">
                                    <img src="/images/account/profile.png" alt="" />
                                    <span>Public Profile Picture</span>
                                </div>
                            </Col>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="avatar">
                                    <img
                                        className="u-avatar-rounded"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAA6NJREFUeF7t3bGNFUEQRdH+NmIdcLA2CNy1IQAsbCRSIAYSwMMmhl17IyAOMLEhiINUKs3Fr5nu13deveH39tzu717+PfDvy4uPUO2lX//88IvAFbbP/xYAsPrnnADIAYwgrFYHzAFwAXKAHAARsvIcoBBIBNUCSL5C4PoUjOu/fv45ABJQCCwEIkJWXggsBBJBtQCSrxC4PgTh+q+ffw6ABBQCC4GIkJUXAguBRNDt7c8PtB/g18MTDUAtVJ8AGvx/+DlYx//6+R1NIQBIPn8LCADMECogrj+/Bej4c4DlGSAAcgAyoRwgByCACoEkXyHw9Bpo2+LLAGUA8qAyQBmAACoDkHxlgDLAcAurBdQCyMNqASRfLaAWUAvo52AxkfH/B/j25jPtB/j++Fvmfz69f0X124un9bsFwCxCAZADEIHqoDkAye/FOUAOQBTlACTffHEOkAMQhTkAyTdfnAPkAERhDkDyzRfnADkAUZgDkHzzxTlADkAU5gAk33xxDpADEIU5AMk3XzzuAHpcvEqomxr1D1OuPn4+I+jqAm4HOACQ4AC4uIABEACkwHSGqQXQ8p2TA1xcwAAIAFKgFoDn3E0LmAMQ//t7aAAEACkw7WC9BdDy7XewAAgA+3g06rf+PboMgARsF3D7+GsBFweYAdDz/lH/owcs6P23zz8AkIAAwDNyUP8cAE9JywGQwBwgB0CErFwzUA5g+vMnY/D23AIDAFegFlALQISsvBaAKdjk96Ni9f4BEADEUBmA5MsB1qdgXP/1888BkIDeAnoLQISsvBBYCCSCagEkXyGQt3TpCRe4fuPlekCE7ipmB9AtUQFgH9wIgPFn2AaQA3RIFBGUA5B888U5QA5AFOYAJN98cQ6QAxCFOQDJN1+cA+QARGEOQPLNF+cAOQBRmAOQfPPFOUAOQBTmACTffHEOkAMQhewA+vl43ZJEs6+YN6Xy18MDYJZC3ZQaALPrx3cPAJZw9wUCYPf68egDgCXcfYEA2L1+PPoAYAl3XyAAdq8fjz4AWMLdFwiA3evHow8AlnD3BQJg9/rx6AOAJdx9gQDYvX48+gBgCXdfgAG4v7NPxugAVP7pn6O3z5/PB9gugAK4ff4BgAQEQKeEIUJWri0wBzD9eU8e3r7j4vUJ0AWoBdQClCGq1wegFkDyd07g+h6I679+/jkAElAGKAMgQlZeBuiwaCKoFkDyFQLXhyBc//XzzwGQgEJgIRARsnINgf8A2HjKbtQ/p5oAAAAASUVORK5CYII="
                                        alt=""
                                    />
                                    <Button className="btn_profile">Change Picture</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="pulsescan_content_top_username">
                        <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="left">
                                    <img src="/images/account/profileview.png" alt="" />
                                    <span>Public Profile</span>
                                </div>
                            </Col>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <Button className="btn_view">
                                    <a href="#">View public profile page</a>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="pulsescan_content_top_username">
                        <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="left">
                                    <img src="/images/account/overview.png" alt="" />
                                    <span>Public Profile Name</span>
                                </div>
                            </Col>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <InputWrapper
                                    inputProps={getInputProps('username')}
                                    renderInput={(props) => <InputText {...props} placeholder={'Public user profile name'} />}
                                />
                                {/* <InputOverview   /> */}
                                <div style={{ display: 'flex', margin: '16px 0px' }}>
                                    <div style={{ width: '10%' }}>
                                        <img
                                            style={{ fontWeight: 400, width: '21px' }}
                                            src="/images/account/matching.png"
                                            alt=""
                                        />
                                    </div>
                                    &ensp;
                                    <span style={{ fontSize: '12px', fontWeight: 400, lineHeight: '15px' }}>
                                        Your PUBLIC Profile information can be viewed publicly. Please do not enter sensitive
                                        information like your private keys here.
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="pulsescan_content_top_username">
                        <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="left">
                                    <img src="/images/account/web.png" alt="" />
                                    <span>Public Profile Website</span>
                                </div>
                            </Col>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <InputWrapper
                                    inputProps={getInputProps('website')}
                                    renderInput={(props) => <InputText {...props} placeholder={'https://yourwebsite.com'} />}
                                />
                                {/* <InputOverview placeholder={'https://yourwebsite.com'} /> */}
                            </Col>
                        </Row>
                    </div>
                    <div className="pulsescan_content_top_username">
                        <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <div className="left">
                                    <img src="/images/account/BIO.png" alt="" />
                                    <span>Public Profile BIO</span>
                                </div>
                            </Col>
                            <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                                <InputWrapper
                                    inputProps={getInputProps('bio')}
                                    renderInput={(props) => (
                                        <TextArea
                                            {...props}
                                            rows={4}
                                            placeholder={'Your public profile BIO info (up to 155 characters)'}
                                        />
                                    )}
                                />
                                {/* <TextArea rows={4} placeholder="Your public profile BIO info (up to 155 characters)" maxLength={6} /> */}
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="pulsescan_content_bottom">
                    <div className="flex-end">
                        <Button className="btn_cancel" onClick={handleCancel}>
                            Cancel
                        </Button>
                        &ensp;
                        <Button className="btn_save" loading={isSubmitting} onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </CardOverview>
    )
}

export default PulsescanConnect
