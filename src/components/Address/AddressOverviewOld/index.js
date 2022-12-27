import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { Progress, Modal, Button, Col, Dropdown, Menu, Row, Space, Table, Tabs, message, Input } from 'antd'

const AddressOverview = ({ tokenInfo }) => {
  return (
    <div className="card main-top-left">
      <div className="main-top-left-header">
        Overview
        <span>PN-721</span>
      </div>
      <div className="main-top-left-body">
        <div className="main-top-left-body-item">
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              Total Supply:
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <CurrencyFormat
                value={tokenInfo.totalSupply / 10 ** tokenInfo.decimals}
                displayType="text"
                thousandSeparator
                renderText={(value) => value}
              />{' '}
              <strong>{tokenInfo.symbol}</strong>
            </Col>
          </Row>
        </div>
        <div className="main-top-left-body-item">
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              Holders:
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              16,552 addresses
            </Col>
          </Row>
        </div>
        <div className="main-top-left-body-item">
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              Transfers:
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              11,290,787
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default AddressOverview
