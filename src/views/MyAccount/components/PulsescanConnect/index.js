import React from 'react'
import { Button, Input, Col, Row } from 'antd'
import styled from 'styled-components'
import CardOverview from '../CardOverview'
import InputOverview from 'components/InputOverview'

const { TextArea } = Input
const UserSettingTitle = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  font-size: 16px;
`
const PulsescanConnect = ({ userInfo }) => {
  return (
    <>
      <CardOverview className="pulsescan" title={'Public Profile Info'}>
        <UserSettingTitle>
          Your Public Profile information is shared publicly. Please DO NOT enter sensitive information such as your private keys
          here.
        </UserSettingTitle>
        <div className="overview_info_content pulsescan_content">
          <div className="pulsescan_content_top">
            <div className="pulsescan_content_top_username">
              <Row>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <img src="/images/account/profile.png" alt="" />
                  <span>Public Profile Picture</span>
                </Col>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <div>
                    <img src="/images/account/profile.png" style={{ width: '34px' }} alt="" />
                    <Button className="btn_profile">Change Picture</Button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pulsescan_content_top_username">
              <Row>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <img src="/images/account/overview.png" alt="" />
                  <span>PULSESCAN Public Profile</span>
                </Col>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <Button className="btn_view">
                    <a href="#">View public profile page</a>
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="pulsescan_content_top_username">
              <Row>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <img src="/images/account/overview.png" alt="" />
                  <span>Public Profile Name</span>
                </Col>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <InputOverview placeholder={'Public user profile name'} />
                  <div style={{ display: 'flex', margin: '16px 0px' }}>
                    <div style={{ width: '10%' }}>
                      <img style={{ fontWeight: 400, width: '21px' }} src="/images/account/matching.png" alt="" />
                    </div>
                    {/* &ensp; */}
                    <span style={{ fontSize: '12px', fontWeight: 400, lineHeight: '15px' }}>
                      Your PUBLIC Profile information can be viewed publicly. Please do not enter sensitive information like your
                      private keys here.
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="pulsescan_content_top_username">
              <Row>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <img src="/images/account/web.png" alt="" />
                  <span>Public Profile Website</span>
                </Col>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <InputOverview placeholder={'https://yourwebsite.com'} />
                </Col>
              </Row>
            </div>
            <div className="pulsescan_content_top_username">
              <Row>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <img src="/images/account/BIO.png" alt="" />
                  <span>Public Profile BIO</span>
                </Col>
                <Col xl={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 24 }}>
                  <TextArea rows={4} placeholder="Your public profile BIO info (up to 155 characters)" maxLength={6} />
                </Col>
              </Row>
            </div>
          </div>

          <div className="pulsescan_content_bottom">
            <div className="flex-end">
              <Button className="btn_cancel">Cancel</Button>
              &ensp;
              <Button className="btn_save">Save Changes</Button>
            </div>
          </div>
        </div>
      </CardOverview>
    </>
  )
}

export default PulsescanConnect
