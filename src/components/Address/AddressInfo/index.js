import React from 'react'
import { Col, Row } from 'antd'
import { Link } from 'components/Link'
import { ADDRESS_TYPE } from 'redux/constants'
import { useSettings } from 'redux/settings/hooks'
import CardBase from 'components/Card/CardBase'

const AddressInfo = ({ addressType, addressDetail, userInfo }) => {
  const { appearance } = useSettings()

  return (
    <div className="card_address_info">
      <CardBase
        title="More Info"
        items={[{}]}
        backgroundHeader={appearance?.card?.header_bg_color}
        backgroundBody={appearance?.card?.body_bg_color}
        content={
          <>
            <Row className="card_address_info_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                My Name Tag:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                Not Available,{` `}
                {userInfo ? <Link href="/login">Update?</Link> : <Link href="/login">login to update</Link>}
              </Col>
            </Row>
            {addressType !== ADDRESS_TYPE.address && (
              <Row className="card_address_info_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                  ContractCreator:
                </Col>

                {addressDetail?.ca?.a && (
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <div className="contract-creator">
                      {addressDetail?.ca?.a && (
                        <Link className={addressDetail?.ch ? 'valid' : ''} href={`/address/${addressDetail?.ca?.a || '#'}`}>
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
                )}
              </Row>
            )}
            {addressType === ADDRESS_TYPE.tokenErc20 && (
              <Row className="card_address_info_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
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
      />
    </div>
  )
}

export default AddressInfo
