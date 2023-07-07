import React from 'react'
import { Col, Row } from 'antd'
import FormatAmount from 'components/FormatAmount'
import NextLink from 'components/Link/Link'

const CardFilterTokenAddressBalance = ({ address, token, addressDetail, tokenBalance }) => {
    return (
        <div className="CardFilterTokenAddressBalance card">
            <div class="card-body">
                <Row gutter={[12, 12]}>
                    <Col xs={24} sm={24} md={8} className="item">
                        <h6 className="label">Filtered by Token Holder</h6>
                        <div className="address text-truncate">
                            <NextLink href={`/address/${address}`}>{address}</NextLink>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} className="item">
                        <div className="balance">
                            <h6>Balance</h6>
                            <span>
                                <FormatAmount value={tokenBalance?.v} suffix={` ${addressDetail?.pro.sym}`} />
                            </span>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} className="item">
                        <div className="value">
                            <h6>Value</h6>
                            <span>$0.00</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CardFilterTokenAddressBalance
