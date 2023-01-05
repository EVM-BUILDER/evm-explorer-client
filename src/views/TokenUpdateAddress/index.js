import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Col, Row, Space } from 'antd'
import * as Yup from 'yup'
import PublicLayoutBlock from 'layouts/PublicLayoutBlock'
import Page from 'views/Page'
import { BaseButton } from 'components/Button'
import { useForm } from 'components/Form/useForm'
import { InputSelect, InputText, InputWithLeftIcon, InputWrapper, TextArea } from 'components/Input'
import {
  BsCurrencyBitcoin,
  BsDiscord,
  BsFacebook,
  BsFilePdf,
  BsFilePdfFill,
  BsGithub,
  BsLinkedin,
  BsMedium,
  BsReddit,
  BsSlack,
  BsTelegram,
  BsTwitter,
} from 'react-icons/bs'
import AntCheckbox from 'components/AntCheckbox'
import { submitInfoToken } from 'redux/accounts/actions'

const isDev = process.env.NODE_ENV === 'development'

const TokenUpdate = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { address } = router.query

  const [checked, setChecked] = useState({ value: false, message: '' })
  const [submitMess, setSubmitMess] = useState({
    status: null,
    message: '',
  })

  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: 'requestType',
        defaultValue: 'New/First Time Token Update',
        validate: Yup.string().required('Required'),
      },
      {
        name: 'requestType_message',
        defaultValue: isDev ? 'Please specify the category of your token update application.' : '',
      },
      {
        name: 'basicInformation_address',
        defaultValue: address,
        validate: Yup.string().required('Contract address is required'),
      },
      {
        name: 'basicInformation_name',
        defaultValue: isDev ? 'PI USD' : '',
        validate: Yup.string().required('Requester name is required'),
      },
      {
        name: 'basicInformation_email',
        defaultValue: isDev ? 'pscsmartchain@gmail.com' : '',
        validate: Yup.string().required('Please enter a valid email address'),
      },
      {
        name: 'basicInformation_projectName',
        defaultValue: isDev ? 'Pi Smart Chain' : '',
      },
      {
        name: 'basicInformation_website',
        defaultValue: isDev ? 'https://google.com' : '',
        validate: Yup.string().required('Project website is required'),
      },
      {
        name: 'basicInformation_official_email',
        defaultValue: isDev ? 'pscsmartchainoffical@gmail.com' : '',
        validate: Yup.string().required('Project email address is required'),
      },
      {
        name: 'basicInformation_logo',
        defaultValue: isDev ? 'https://google.com/logo.png' : '',
        validate: Yup.string().required('Link to download a 32x32 png icon logo is required'),
      },
      {
        name: 'basicInformation_sector',
        defaultValue: isDev ? 'WEB3,WEB4' : '',
        validate: Yup.string().required('Required'),
      },
      {
        name: 'basicInformation_project_description',
        defaultValue: isDev ? 'SUPPER PROJECT' : '',
        validate: Yup.string().required('Project description is required'),
      },
      // Social
      {
        name: 'socialProfiles_whitepaper',
        defaultValue: isDev ? 'whitepaper' : '',
      },
      {
        name: 'socialProfiles_medium',
        defaultValue: isDev ? 'medium' : '',
      },
      {
        name: 'socialProfiles_github',
        defaultValue: isDev ? 'github' : '',
      },
      {
        name: 'socialProfiles_reddit',
        defaultValue: isDev ? 'reddit' : '',
      },
      {
        name: 'socialProfiles_telegram',
        defaultValue: isDev ? 'telegram' : '',
      },
      {
        name: 'socialProfiles_slack',
        defaultValue: isDev ? 'slack' : '',
      },
      {
        name: 'socialProfiles_wechat',
        defaultValue: isDev ? 'wechat' : '',
      },
      {
        name: 'socialProfiles_facebook',
        defaultValue: isDev ? 'facebook' : '',
      },
      {
        name: 'socialProfiles_linkedin',
        defaultValue: isDev ? 'linkadin' : '',
      },
      {
        name: 'socialProfiles_twitter',
        defaultValue: isDev ? 'twitter' : '',
      },
      {
        name: 'socialProfiles_discord',
        defaultValue: isDev ? 'discord' : '',
      },
      {
        name: 'socialProfiles_bitcointalk',
        defaultValue: isDev ? 'bitcointalk' : '',
      },
      {
        name: 'socialProfiles_ticketing',
        defaultValue: isDev ? 'ticketing' : '',
      },

      // Others
      {
        name: 'other_public_sale',
        defaultValue: `1. *Token Sale Address: 

2. *Token Sale Start Date: 

3. *Token Sale End Date: 

4. *Token Price (in USD and/or BNB): 

5. Public Sale Allocation: 

6. Public Sale Vesting Period: 

7. IEO Launchpad: 

8. Country: 

9. Soft Cap / Hard Cap (If any): 

10. Amount Raised: 

11. Token Distribution Date:`,
      },
      {
        name: 'other_private_sale',
        defaultValue: `1. Private Sale Token Price (in USD and/or BNB): 

2. Private Sale Allocation: 

3. Private Sale Vesting Period: 

4. Seed Sale Token Price (in USD and/or BNB): 

5. Seed Sale Allocation: 

6. Seed Sale Vesting Period: `,
      },
      {
        name: 'other_burn_event',
        defaultValue: `1. Announcements Link: 
  Tx Hash: 

2. Announcements Link: 
  Tx Hash: 

3. Announcements Link: 
  Tx Hash:`,
      },
    ],
    onSubmit: async (values) => {
      if (!checked.value) {
        return setChecked((prev) => ({ ...prev, message: 'Please check and agree' }))
      }
      setChecked((prev) => ({ ...prev, message: '' }))
      setSubmitMess({ status: null, message: '' })

      dispatch(
        submitInfoToken(
          {
            address: values.address,
            requestType: {
              request_type: values.requestType,
              message: values.requestType_message,
            },
            basicInformation: {
              address: values.basicInformation_address,
              name: values.basicInformation_name,
              requester_email: values.basicInformation_email,
              project_name: values.basicInformation_projectName,
              website: values.basicInformation_website,
              official_email: values.basicInformation_official_email,
              logo: values.basicInformation_logo,
              sector: values.basicInformation_sector,
              description: values.basicInformation_project_description,
            },
            socialProfiles: {
              whitepaper: values.socialProfiles_whitepaper,
              medium: values.socialProfiles_medium,
              github: values.socialProfiles_github,
              reddit: values.socialProfiles_reddit,
              telegram: values.socialProfiles_telegram,
              slack: values.socialProfiles_slack,
              wechat: values.socialProfiles_wechat,
              facebook: values.socialProfiles_facebook,
              linkedin: values.socialProfiles_linkedin,
              twitter: values.socialProfiles_twitter,
              discord: values.socialProfiles_discord,
              bitcointalk: values.socialProfiles_bitcointalk,
              ticketing: values.socialProfiles_ticketing,
            },
            other: {
              public_sale: values.other_public_sale,
              private_sale: values.other_private_sale,
              burn_event: values.other_burn_event,
            },
          },
          () => {
            router.push(`/myaccount#verifiedaddresses`)
          },
          (error) => {
            setSubmitMess({ status: false, message: error.message || 'Error' })
          },
        ),
      )
    },
  })

  return (
    <Page className="TokenUpdate">
      <div className="TokenUpdate-header">
        <h2>Token Update Application Form</h2>
      </div>
      <div className="TokenUpdate-body">
        <div className="TokenUpdate-form">
          <div className="TokenUpdate-form-frame">
            <Row
              gutter={[
                { xs: 10, sm: 10, md: 32 },
                { xs: 10, sm: 10, md: 32 },
              ]}
            >
              <Col span={12}>
                <div className="sticky-top">
                  <h2 className="left-title">Request Type</h2>
                  <p className="left-description">Please specify the category of your token update application.</p>
                </div>
              </Col>
              <Col span={12}>
                <Row
                  gutter={[
                    { xs: 10, sm: 12, lg: 20 },
                    { xs: 10, sm: 12, lg: 20 },
                  ]}
                >
                  <Col span={24}>
                    <InputWrapper
                      label="Choose one"
                      inputProps={getInputProps('requestType')}
                      isRequired
                      renderInput={(props) => (
                        <InputSelect
                          options={[
                            {
                              value: 'New/First Time Token Update',
                              label: 'New/First Time Token Update',
                            },
                            {
                              value: 'Existing Token Info Update',
                              label: 'Existing Token Info Update',
                            },
                            {
                              value: 'Token/Contract Migration',
                              label: 'Token/Contract Migration',
                            },
                          ]}
                          {...props}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Comment/Message"
                      inputProps={getInputProps('requestType_message')}
                      renderInput={(props) => <TextArea {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          {/*  */}
          <div className="TokenUpdate-form-frame">
            <Row
              gutter={[
                { xs: 10, sm: 10, md: 32 },
                { xs: 10, sm: 10, md: 32 },
              ]}
            >
              <Col span={12}>
                <div className="sticky-top">
                  <h2 className="left-title">Basic Information</h2>
                  <p className="left-description">
                    Kindly check that all the links provided are working and are safe to visit before submitting.
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <Row
                  gutter={[
                    { xs: 10, sm: 12, lg: 20 },
                    { xs: 10, sm: 12, lg: 20 },
                  ]}
                >
                  <Col span={24}>
                    <InputWrapper
                      label="Token Contract Address"
                      inputProps={getInputProps('basicInformation_address')}
                      isRequired
                      renderInput={(props) => <InputText placeholder={`(0x...)`} {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Requester Name"
                      isRequired
                      inputProps={getInputProps('basicInformation_name')}
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Requester Email Address"
                      isRequired
                      inputProps={getInputProps('basicInformation_email')}
                      description="Please make sure that you provide an email account of the project’s official domain. If the contact email is using public domains (eg. Gmail) do publish on the website for acknowledgement/verification."
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      label="Project Name"
                      inputProps={getInputProps('basicInformation_projectName')}
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      label="Official Project Website"
                      isRequired
                      inputProps={getInputProps('basicInformation_website')}
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Official Project Email Address"
                      isRequired
                      inputProps={getInputProps('basicInformation_official_email')}
                      description="Please make sure the email provided has the project official domain as its suffix."
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Link to download a 32x32 png icon logo"
                      isRequired
                      inputProps={getInputProps('basicInformation_logo')}
                      description="Image should be a PNG file with a resolution of 32x32"
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Project Sector"
                      inputProps={getInputProps('basicInformation_sector')}
                      description="Please specify the industry/field that the project is a part of"
                      renderInput={(props) => <InputText {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Project Description (Max 300 characters)"
                      isRequired
                      inputProps={getInputProps('basicInformation_project_description')}
                      description={`Briefly encapsulate, introduce or summarise the project’s operation/mechanism/goals in a maximum of 300 characters. The short description should be written in a neutral point of view and must exclude unsubstantiated claims ("first", "most", "best", and etc) unless proven otherwise.`}
                      renderInput={(props) => <TextArea {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          {/* Social Profiles */}
          <div className="TokenUpdate-form-frame">
            <Row
              gutter={[
                { xs: 10, sm: 10, md: 32 },
                { xs: 10, sm: 10, md: 32 },
              ]}
            >
              <Col span={12}>
                <div className="sticky-top">
                  <h2 className="left-title">Social Profiles</h2>
                  <p className="left-description">
                    Kindly provide us with the links to your official social media pages on these platforms. These are usually the
                    secondary channels which users may use to contact your team.
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <Row
                  gutter={[
                    { xs: 10, sm: 12, lg: 20 },
                    { xs: 10, sm: 12, lg: 20 },
                  ]}
                >
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_whitepaper')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsFilePdf />} placeholder="Whitepaper" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_medium')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsMedium />} placeholder="Medium" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_github')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsGithub />} placeholder="Github" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_reddit')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsReddit />} placeholder="Reddit" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_telegram')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsTelegram />} placeholder="Telegram" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_slack')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsSlack />} placeholder="Slack" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_wechat')}
                      renderInput={(props) => <InputWithLeftIcon placeholder="WeChat" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_facebook')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsFacebook />} placeholder="Facebook" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_linkedin')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsLinkedin />} placeholder="Linkedin" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_twitter')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsTwitter />} placeholder="Twitter" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_discord')}
                      renderInput={(props) => <InputWithLeftIcon leftIcon={<BsDiscord />} placeholder="Discord" {...props} />}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_bitcointalk')}
                      renderInput={(props) => (
                        <InputWithLeftIcon leftIcon={<BsCurrencyBitcoin />} placeholder="Bitcointalk" {...props} />
                      )}
                    />
                  </Col>
                  <Col span={12}>
                    <InputWrapper
                      inputProps={getInputProps('socialProfiles_ticketing')}
                      renderInput={(props) => <InputWithLeftIcon placeholder="Ticketing" {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          {/* Other */}
          <div className="TokenUpdate-form-frame">
            <Row
              gutter={[
                { xs: 10, sm: 10, md: 32 },
                { xs: 10, sm: 10, md: 32 },
              ]}
            >
              <Col span={12}>
                <div className="sticky-top">
                  <h2 className="left-title">Others</h2>
                  <p className="left-description">
                    Information pertaining to the project’s token sales (ICO/IEO) and/or burn history. Kindly provide
                    links/sources where required.
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <Row
                  gutter={[
                    { xs: 10, sm: 12, lg: 20 },
                    { xs: 10, sm: 12, lg: 20 },
                  ]}
                >
                  <Col span={24}>
                    <InputWrapper
                      label="Public Sale (ICO/IEO) Details (if applicable)"
                      inputProps={getInputProps('other_public_sale')}
                      renderInput={(props) => <TextArea height="500px" placeholder="Whitepaper" {...props} />}
                    />
                  </Col>
                  <Col span={24}>
                    <InputWrapper
                      label="Private Sale Details (if applicable)"
                      inputProps={getInputProps('other_private_sale')}
                      renderInput={(props) => <TextArea height="300px" placeholder="Whitepaper" {...props} />}
                    />
                  </Col>{' '}
                  <Col span={24}>
                    <InputWrapper
                      label="Burn Events (if applicable)"
                      inputProps={getInputProps('other_burn_event')}
                      renderInput={(props) => <TextArea height="200px" placeholder="Whitepaper" {...props} />}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="TokenUpdate-agree-check">
            <AntCheckbox
              checked={checked.value}
              onChange={(e) => setChecked({ value: e.target.checked, message: e.target.checked ? '' : 'Please check and agree' })}
            >
              <p>
                By clicking 'Submit', you are agreeing that you have provided all the details and information required for the
                token update process. Should any details or information submitted are found to be incomplete, false or fraudulent,
                we reserve the right to reject your token update request and we are not obliged to disclose or explain our reasons
                of rejection. If your submission is aptly completed, our team will get back to you with further instructions as
                soon as possible. Please do not submit duplicate submissions within this period of time.
              </p>
              {checked.message && <p className="errorMessage">{checked.message}</p>}
            </AntCheckbox>
          </div>

          {submitMess.status === false && (
            <div className="boxError" role="alert">
              {submitMess.message}
              <br />
            </div>
          )}

          <div className="TokenUpdate-action">
            <Space>
              <BaseButton variant="gray" onClick={() => router.reload(router.pathname)}>
                Reset
              </BaseButton>
              <BaseButton onClick={handleSubmit}>Submit</BaseButton>
            </Space>
          </div>
        </div>
      </div>
    </Page>
  )
}

TokenUpdate.Layout = PublicLayoutBlock
export default TokenUpdate
