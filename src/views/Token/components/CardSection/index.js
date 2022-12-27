import { Col, Row } from 'antd'
import TokenContract from 'components/Token/TokenContract'
import TokenOverview from 'components/Token/TokenOverview'
import React from 'react'

const CardSection = ({ address, addressDetail, statistics, totalTransfer }) => {
  return (
    <Row gutter={[{ md: 15, xl: 30 }, 30]}>
      <Col xs={24} md={12}>
        <TokenOverview addressDetail={addressDetail} statistics={statistics} totalTransfer={totalTransfer} />
      </Col>
      <Col xs={24} md={12}>
        <TokenContract address={address} addressDetail={addressDetail} />
      </Col>
    </Row>
  )
}

export default CardSection
