import React from 'react'
import { Button, Row, Col } from 'antd'
import CardOverview from '../CardOverview'
import styled from 'styled-components'

const OverviewUsageTitle = styled.div`
  margin: 24px 24px 0px 24px;
  font-size: 16px;
`

const OverviewUsage = ({ userInfo }) => {
  return (
    <CardOverview className="overview_usage" title="Overview Usage">
      <OverviewUsageTitle>
        Usage of account features such as address watch list, address name tags, and API keys.
      </OverviewUsageTitle>
      <div className="overview_usage_content">
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/totalPULSE.png" alt="" />
              <span>Total PULSE Balance (Watch List)</span>
            </Col>
            <Col xl={{ span: 12 }} sm={{ span: 16 }} md={{ span: 14 }} xs={{ span: 24 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 400 }}>0 Ether ($0.00)</h3>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/mail.png" alt="" />
              <span> Email Notification Limit</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 400 }}>0 emails sent out</h3>
              <Button className="btn_usage">100 daily limit</Button>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/watchlist.png" alt="" />
              <span>Address Watch List</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <a href="#">0 address alert(s)</a>
              <Button className="btn_usage">Show History</Button>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/privatenotes.png" alt="" />
              <span>Txn Private Notes</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <a href="#">0 transaction private note(s)</a>
              <Button className="btn_usage">Show History</Button>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/privatenametags.png" alt="" />
              <span>Address Tags</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <a href="#">0 address tag(s)</a>
              <Button className="btn_usage">Show History</Button>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/api.png" alt="" />
              <span>API Key Usage</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <a href="#">0 active API(s)</a>
              <Button className="btn_usage">Show History</Button>
            </Col>
          </Row>
        </div>
        <div className="overview_usage_content_username">
          <Row>
            <Col xl={{ span: 12 }} sm={{ span: 8 }} md={{ span: 10 }} xs={{ span: 24 }}>
              <img src="/images/account/verifiedaddresses.png" alt="" />
              <span>Verified Addresses</span>
            </Col>
            <Col
              xl={{ span: 12 }}
              sm={{ span: 16 }}
              md={{ span: 14 }}
              xs={{ span: 24 }}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <a href="#">0 verified addresses</a>
              <Button className="btn_usage">Show History</Button>
            </Col>
          </Row>
        </div>
      </div>
    </CardOverview>
  )
}

export default OverviewUsage
