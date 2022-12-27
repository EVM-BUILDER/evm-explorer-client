import React from 'react'
import router from 'next/router'
import { Row, Col, Button } from 'antd'

import AccountSidebar from 'components/AccountSidebar'
import Breadcrumb from 'components/Breadcrumb'

const breadcrumb = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '',
    title: 'Account Overview',
    isCurrent: true,
  },
]

const OverviewModule = () => {
  return (
    <div className="account-wrapper UserOverview">
      <div className="container">
        <div className="account-heading">
          <h1>Account Overview</h1>
        </div>
        <Breadcrumb listItems={breadcrumb} />
        <div className="account-inner">
          <AccountSidebar active="overview" />
          <div className="account-content">
            <div className="block-info person-info">
              <h2 className="block-title">Personal Info</h2>
              <div className="block-content">
                <p className="info-desc">Below are the username, email and overview information for your account.</p>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/email.svg" alt="" />
                    <span>Your Email Address</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span>huyette300399@gmail.com</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button
                      onClick={() =>
                        router.push({
                          pathname: '/account/settings',
                        })
                      }
                    >
                      Setting
                    </Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/login.svg" alt="" />
                    <span>Last Login</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span>2022-10-27 07:47:13(UTC)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Show History</Button>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="block-info person-info">
              <h2 className="block-title">Overview Usage</h2>
              <div className="block-content">
                <p className="info-desc">
                  Usage of account features such as address watch list, address name tags, and API keys.
                </p>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/wallet.svg" alt="" />
                    <span>Total PULSE Balance (Watch List)</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span>0 Ether ($0.00)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/email.svg" alt="" />
                    <span>Email Notification Limit</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span>0 emails sent out</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/address.svg" alt="" />
                    <span>Address Watch List</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span className="primary-color">0 address alert(s)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/txn.svg" alt="" />
                    <span>Txn Private Notes</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span className="primary-color">0 transaction private note(s)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/address-tags.svg" alt="" />
                    <span>Address Tags</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span className="primary-color">0 address tag(s)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/api-key.svg" alt="" />
                    <span>API Key Usage</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span className="primary-color">0 active API(s)</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
                <Row className="info-item">
                  <Col xs={{ span: 24 }} md={{ span: 11 }}>
                    <img src="/images/account/verified.svg" alt="" />
                    <span>Verified Addresses</span>
                  </Col>
                  <Col xs={{ span: 16 }} md={{ span: 8 }}>
                    <span className="primary-color">0 verified addresses</span>
                  </Col>
                  <Col xs={{ span: 8 }} md={{ span: 5 }} className="text-right">
                    <Button>Soon</Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewModule
