import React from 'react'
import { Link } from 'components/Link'
import CardBase from 'components/Card/CardBase'
import { Col, Row } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { ADDRESS_TYPE } from 'redux/constants'

const address = {
  balance: 0.000160398587097,
  blockChain: 'PN-20',
  priceUSD: 0.000648,
  priceChangePercent: '-0.03',
  volume: '32,290,064,214.76',
  totalSupply: '32,297,815,690.525604',
  holders: '4,465,382 (0.00%)',
  transfer: '162,245,033',
}

const AddressInfo = ({ addressType, addressDetail, userInfo }) => {
  return (
    <div className="card_address_info">
      <CardBase
        title="More Info"
        items={[{}]}
        content={
          <>
            <Row className="card_address_info_item">
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                My Name Tag:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                Not Available,{` `}
                {userInfo ? <Link href="/login">Update?</Link> : <Link href="/login">login to update</Link>}
              </Col>
            </Row>
            {addressType !== ADDRESS_TYPE.address && (
              <Row className="card_address_info_item">
                <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                  ContractCreator:
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                  <div className="contract-creator">
                    {addressDetail?.ca?.a && (
                      <Link
                        className={addressDetail?.ch ? 'valid' : ''}
                        href={`/address/${addressDetail?.ca?.a || '#'}`}
                      >
                        {addressDetail?.ca?.a || 'Unknown'}
                      </Link>
                    )}

                    {addressDetail?.ch && (
                      <>
                        at txn <Link href={`/tx/${addressDetail?.ch || '#'}`}>{addressDetail?.ch || '--'}</Link>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            )}
            {addressType === ADDRESS_TYPE.tokenErc20 && (
              <Row className="card_address_info_item">
                <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                  TokenTracker:
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                  <div className="token-tracker">
                    <img src={addressDetail?.data?.pro?.ico || '/images/icon/empty-token.webp'} alt="" />{' '}
                    <Link href={`/token/${addressDetail?.data?.a}`}>
                      {addressDetail?.data?.pro?.na} ({addressDetail?.data?.pro?.sym})
                    </Link>{' '}
                  </div>
                </Col>
              </Row>
            )}
          </>
        }
        rightNode={
          <div className="right-node-address">
            <Link href="#">
              <a target="_blank" rel="noreferrer noopener">
                <img src="/images/contract/heart.svg" alt="check" />
              </a>
            </Link>
            <Link href="#">
              <a target="_blank" rel="noreferrer noopener">
                More
              </a>
            </Link>
          </div>
        }
        backgroundHeader="#EEEEEE"
      />
    </div>
  )
}

export default AddressInfo
