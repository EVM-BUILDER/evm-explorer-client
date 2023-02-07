import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Col, Row, Space } from 'antd'
import * as Yup from 'yup'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import Page from 'views/Page'
import { BaseButton } from 'components/Button'
import { useForm } from 'components/Form/useForm'
import { InputText, InputWrapper } from 'components/Input'
import { isAddress } from 'utils'
import { submitInfoToken } from 'redux/accounts/actions'

const TokenUpdateImport = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { address }= router.query

  const [submitMess, setSubmitMess] = useState({
    status: null,
    message: '',
  })

  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: 'address',
        validate: Yup.string()
          .required('Required')
          .test({
            message: 'Address is not valid',
            test: function (value) {
              if (isAddress(value)) return true
              return false
            },
          }),
      },
    ],
    onSubmit: async (values) => {
      setSubmitMess({ status: null, message: '' })
      dispatch(
        submitInfoToken(
          { address: values.address, requestType: '', basicInformation: '', socialProfiles: '', other: '' },
          () => {
            router.push(`/tokenupdate/${values.address}`)
          },
          (error) => {
            setSubmitMess({ status: false, message: error.message || 'Error' })
          },
        ),
      )
    },
  })

  return (
    <Page className="tokenUpdateImport">
      <div className="tokenUpdateImport-header">
        <h2>Token Update Application Form</h2>
      </div>
      <div className="tokenUpdateImport-body">
        {submitMess.status === false && (
          <div className="boxError" role="alert">
            {submitMess.message}
            <br />
          </div>
        )}
        <div className="tokenUpdateImport-form">
          <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
            <Col span={24}>
              <InputWrapper
                label="Please enter the contract address"
                inputProps={getInputProps('address')}
                isRequired
                renderInput={(props) => <InputText {...props} placeholder={`(0x...)`} />}
              />
            </Col>
          </Row>
          <div className="tokenUpdateImport-action">
            <Space>
              <BaseButton size="small" variant="gray" onClick={() => router.reload(router.pathname)}>
                Reset
              </BaseButton>
              <BaseButton size="small" onClick={handleSubmit}>
                Next
              </BaseButton>
            </Space>
          </div>
        </div>
      </div>
    </Page>
  )
}

TokenUpdateImport.Layout = PublicLayoutBlock
export default TokenUpdateImport
