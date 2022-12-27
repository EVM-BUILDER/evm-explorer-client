import React, { useState } from 'react'
import { Button, Checkbox, Row, Col } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'
import InputOverview from 'components/InputOverview'
import { useDispatch } from 'react-redux'
import { TAB_ACCOUNT_LINK } from 'views/MyAccount/accountConfig'

const PasswordTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const Password = ({ userInfo, onChangeTab }) => {
  const dispatch = useDispatch()
  const [errorMess, setErrorMess] = useState('')

  const [oldPassword, setOldPassword] = useState({
    value: '',
    message: '',
  })
  const [newPassword, setNewPassword] = useState({
    value: '',
    message: '',
  })
  const [rePassword, setRePassword] = useState({
    value: '',
    message: '',
  })

  const [submitSuccessMess, setSubmitSuccessMess] = useState({
    status: null,
    message: '',
  })

  const handleChangePassword = () => {
    setSubmitSuccessMess({ status: '', message: '' })

    if (errorMess) return

    setErrorMess('')
    // dispatch(
    //   updateProfile(
    //     formUser,
    //     () => {
    //       dispatch(getProfile())
    //       setSubmitSuccessMess({ status: true, message: 'Profile updated successfully' })
    //     },
    //     (error) => {
    //       setSubmitSuccessMess({ status: false, message: error?.message || 'Profile updated successfully' })
    //     },
    //   ),
    // )
  }
  return (
    <CardOverview className="password" title={'Password'} status={submitSuccessMess.status} message={submitSuccessMess.message}>
      <PasswordTitle>Edit the fields below to update your password.</PasswordTitle>
      <div className="overview_info_content password_content">
        <div className="password_content_top">
          <div className="password_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <div className="item left">
                  <img src="/images/account/lock.png" alt="" />
                  <span>Enter OLD Password</span>
                </div>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <InputOverview
                  value={oldPassword.value}
                  placeholder={'Password'}
                  status={oldPassword.message ? 'error' : ''}
                  onChange={(e) => {
                    let errorMess = ''
                    if (!e.target.value) errorMess = 'Please enter your valid email address'
                    setOldPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                      message: errorMess,
                    }))
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="password_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <div className="item left">
                  <img src="/images/account/lock.png" alt="" />
                  <span>Enter NEW Password</span>
                </div>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <InputOverview
                  value={newPassword.value}
                  placeholder={'Password'}
                  status={newPassword.message ? 'error' : ''}
                  onChange={(e) => {
                    let errorMess = ''
                    if (!e.target.value) errorMess = 'Please enter your valid email address'
                    setNewPassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                      message: errorMess,
                    }))
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="password_content_top_username">
            <Row>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <div className="item left">
                  <img src="/images/account/lock.png" alt="" />
                  <span>Re-Confirm Password</span>
                </div>
              </Col>
              <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                <InputOverview
                  value={rePassword.value}
                  placeholder={'Confirm Password'}
                  status={rePassword.message ? 'error' : ''}
                  onChange={(e) => {
                    let errorMess = ''
                    if (!e.target.value) errorMess = 'Please enter your valid email address'
                    else if (newPassword.value !== rePassword.value)
                      errorMess = 'The two passwords that you entered do not match!'

                    setRePassword((prev) => ({
                      ...prev,
                      value: e.target.value,
                      message: errorMess,
                    }))
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className="password_content_bottom">
          <div className="flex-end">
            <Button className="btn_cancel" onClick={() => onChangeTab(TAB_ACCOUNT_LINK.overview)}>
              Cancel
            </Button>
            &ensp;
            <Button className="btn_save" onClick={handleChangePassword}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </CardOverview>
  )
}

export default Password
