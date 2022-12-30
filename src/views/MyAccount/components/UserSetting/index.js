import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Col, Row } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'
import InputOverview from 'components/InputOverview'
import AntCheckbox from 'components/AntCheckbox'
import { Regex } from 'utils/regex.utils'
import { getProfile, requestUpdateProfile } from 'redux/user/actions'

const UserSettingTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`

const detectEmail = (email) => {
  return Regex.email.test(email)
}

const UserSetting = ({ userInfo }) => {
  const dispatch = useDispatch()
  const [errorMess, setErrorMess] = useState('')
  const [submitSuccessMess, setSubmitSuccessMess] = useState({
    status: null,
    message: '',
  })
  const [formUser, setFormUser] = useState({
    email: '',
    subscribe: true,
  })

  useEffect(() => {
    if (userInfo) {
      setFormUser((prev) => ({
        ...prev,
        email: userInfo?.profile.email,
        subscribe: true,
      }))
    }
  }, [userInfo])

  const handleSubmitFormUser = () => {
    setSubmitSuccessMess({ status: '', message: '' })

    if (errorMess) return

    setErrorMess('')
    dispatch(
      requestUpdateProfile(
        formUser,
        () => {
          dispatch(getProfile())
          setSubmitSuccessMess({ status: true, message: 'Profile updated successfully' })
        },
        (error) => {
          setSubmitSuccessMess({ status: false, message: error?.message || 'Profile updated successfully' })
        },
      ),
    )
  }

  return (
    <CardOverview
      title={'User Settings'}
      className="user_settings"
      status={submitSuccessMess.status}
      message={submitSuccessMess.message}
    >
      <UserSettingTitle>Below are the username, email and overview information for your account.</UserSettingTitle>
      <div className="overview_info_content user_settings_content">
        <div className="user_settings_content_top">
          <div className="user_settings_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <img src="/images/account/overview.png" alt="" />
                <span>Your username</span>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{userInfo?.profile?.username || ''}</h3>
              </Col>
            </Row>
          </div>
          <div className="user_settings_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <img src="/images/account/newsletter.png" alt="" />
                <span>Your Email Address</span>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <InputOverview
                  value={formUser.email}
                  placeholder={'Email'}
                  status={errorMess ? 'error' : ''}
                  onChange={(e) => {
                    setFormUser((prev) => ({ ...prev, email: e.target.value }))
                    if (!detectEmail(e.target.value)) {
                      setErrorMess('Please enter your valid email address')
                      return
                    } else {
                      setErrorMess('')
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="user_settings_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <img src="/images/account/lock.png" alt="" />
                <span>Newsletter</span>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <div>
                  <AntCheckbox
                    onChange={(e) => {
                      setFormUser((prev) => ({ ...prev, subscribe: e.target.checked }))
                    }}
                  />
                  &emsp;
                  <span>
                    Subscribe to Newsletter <br /> Etherscan's monthly newsletter brings you the latest features, analyses,
                    trending stories, community contributions, job listings and giveaways !
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="user_settings_content_bottom">
          <div className="flex-end">
            <Button className="btn_cancel">Cancel</Button>
            &ensp;
            <Button className="btn_save" onClick={handleSubmitFormUser}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </CardOverview>
  )
}

export default UserSetting
