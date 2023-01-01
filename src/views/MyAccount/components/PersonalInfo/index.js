import React from 'react'
import { Button, Row, Col } from 'antd'
import CardOverview from '../CardOverview'
import styled from 'styled-components'
import { formatDate } from 'library/helpers/Date'

const PersonalInfoTitle = styled.div`
  margin: 24px 24px 0px 24px;
  font-size: 16px;
`

const PersonalInfo = ({ userInfo, onChangeTab }) => {
  return (
    <CardOverview className="personal_info" title="Personal Info">
      <PersonalInfoTitle>Below are the username, email and overview information for your account.</PersonalInfoTitle>
      <div className="personal_info_content">
        <div className="personal_info_content_username">
          <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/overview.png" alt="" />
              <span>Your username</span>
            </Col>
            <Col xl={{ span: 12 }} sm={{ span: 16 }} md={{ span: 14 }} xs={{ span: 24 }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{userInfo ? userInfo.profile.username : ''}</h3>
            </Col>
          </Row>
        </div>
        <div className="personal_info_content_username">
          <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/mail.png" alt="" />
              <span>Your Email Address</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <h3>{userInfo ? userInfo.profile.email : ''}</h3>
              <Button
                className="btn_overview"
                onClick={() => {
                  onChangeTab('#settings')
                }}
              >
                Edit
              </Button>
            </Col>
          </Row>
        </div>
        <div className="personal_info_content_username">
          <Row gutter={[{ xs: 10 }, { xs: 10 }]}>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/lastlogin.png" alt="" />
              <span>Last Login</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <h3>
                {formatDate(userInfo?.last_login * 1000, 'yyyy-MM-DD hh:mm:ss(UTC)')}
                {/* 2022-10-27 07:47:13(UTC) */}
              </h3>
              <Button className="btn_overview">Show History</Button>
            </Col>
          </Row>
        </div>
      </div>
    </CardOverview>
  )
}

export default PersonalInfo
