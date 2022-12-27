import React from 'react'
import { Col, Row, Table } from 'antd'
import { DownloadOutlined, PieChartFilled } from '@ant-design/icons'
import { Link } from 'components/Link'

const Info = () => {
  return (
    <div className="token-card-info">
      <div className="card-content">
        <div className="card-content-header">
          <div>OVERVIEW</div>
          <div>
            Tether gives you the joint benefits of open blockchain technology and traditional currency by converting
            your cash into a stable digital currency equivalent.
          </div>
        </div>

        <div className="card-content-body">
          <div className="title">Market</div>
          <div className="content">
            <Row>
              <Col span={12}>Volume (24H)</Col>
              <Col span={12}>: $60,871,985,361.00</Col>
            </Row>

            <Row>
              <Col span={12}>Market Capitalization</Col>
              <Col span={12}>: $60,871,985,361.00</Col>
            </Row>

            <Row>
              <Col span={12}>Circulating Supply</Col>
              <Col span={12}>: $60,871,985,361.00 USDT</Col>
            </Row>

            <div>
              <span>Market Data Source:</span>
              <Link href="#">Coinmarketcap</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
