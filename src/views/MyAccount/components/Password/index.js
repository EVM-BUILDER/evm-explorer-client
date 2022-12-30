import React, { useState } from 'react'
import { Button, Checkbox, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
// import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import CardOverview from '../CardOverview'
import { TAB_ACCOUNT_LINK } from 'views/MyAccount/accountConfig'
import { InputWrapper, InputPassword } from 'components/Input'
import { useForm } from 'components/Form/useForm'
import { getProfile, requestChangePassword } from 'redux/user/actions'

const PasswordTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const Password = ({ userInfo, onChangeTab }) => {
  const dispatch = useDispatch()
  const [submitMess, setSubmitMess] = useState({
    status: null,
    message: '',
  })

  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: 'oldPassword',
        validate: Yup.string().required('Required'),
      },
      {
        name: 'newPassword',
        validate: Yup.string()
          .required('Required')
          .matches(/^(?=.*)(?=.*)(?=.{8,})/, 'Minimum 8 characters'),
      },
      {
        name: 'confirmNewPassword',
        validate: Yup.string()
          .required('Required')
          .test({
            message: 'The two passwords that you entered do not match!',
            test: function (value) {
              const password = this.resolve(Yup.ref('newPassword'))
              if (password && value && value !== password) return false
              return true
            },
          }),
      },
      // {
      //   name: 'agreement',
      //   validate: Yup.boolean().oneOf([true], translate('must-be-agree')),
      //   defaultValue: false,
      // },
    ],
    onSubmit: async (values) => {
      setSubmitMess({ status: '', message: '' })
      if (values.newPassword !== values.confirmNewPassword) return
      dispatch(
        requestChangePassword(
          {
            password: values.oldPassword,
            newPassword: values.newPassword,
          },
          () => {
            dispatch(getProfile())
            setSubmitMess({ status: true, message: 'Password updated successfully' })
            // onChangeTab(TAB_ACCOUNT_LINK.overview)
          },
          (error) => {
            setSubmitMess({ status: false, message: error?.message || 'Error' })
          },
        ),
      )
    },
  })

  return (
    <CardOverview className="password" title={'Password'} status={submitMess.status} message={submitMess.message}>
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
                <InputWrapper
                  inputProps={getInputProps('oldPassword')}
                  renderInput={(props) => <InputPassword {...props} placeholder={`Old Password`} />}
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
                <InputWrapper
                  inputProps={getInputProps('newPassword')}
                  renderInput={(props) => <InputPassword {...props} placeholder={`New Password`} />}
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
                <InputWrapper
                  inputProps={getInputProps('confirmNewPassword')}
                  renderInput={(props) => <InputPassword {...props} placeholder={`Confirm Password`} />}
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
            <Button className="btn_save" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </CardOverview>
  )
}

export default Password
