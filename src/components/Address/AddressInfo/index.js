import React from 'react'
import { Col, Row } from 'antd'
import { Link } from 'components/Link'
import { ADDRESS_TYPE } from 'redux/constants'
import { useSettings } from 'redux/settings/hooks'
import CardBase from 'components/Card/CardBase'
import { ClassNames } from 'utils/classNames.util'

const AddressInfo = ({ address, addressType, addressDetail, userInfo }) => {
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
                                {userInfo ? (
                                    <Link href={`/tokenupdate/${address}`}>Update?</Link>
                                ) : (
                                    <Link href="/login">login to update</Link>
                                )}
                            </Col>
                        </Row>
                        {addressType !== ADDRESS_TYPE.address && (
                            <Row className="card_address_info_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
                                <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                                    Contract Creator:
                                </Col>

                                {addressDetail?.ca && (
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <div className="contract-creator">
                                            {addressDetail?.ca && (
                                                <Link
                                                    className={ClassNames({
                                                        valid: Boolean(addressDetail?.ch),
                                                        'hash-tag': true,
                                                        'text-truncate': true,
                                                    })}
                                                    href={`/address/${addressDetail?.ca || '#'}`}
                                                >
                                                    {addressDetail?.ca || 'Unknown'}
                                                </Link>
                                            )}
                                            {addressDetail?.ch && (
                                                <>
                                                    at txn &nbsp;
                                                    <Link href={`/tx/${addressDetail?.ch || '#'}`}>
                                                        {addressDetail?.ch || '--'}
                                                    </Link>
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
                                    Token Tracker:
                                </Col>

                                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                    <div className="token-tracker">
                                        <img src={addressDetail?.pro?.ico || '/images/icon/empty-token.webp'} alt="" />{' '}
                                        <Link href={`/token/${addressDetail?.a}`}>
                                            {addressDetail?.pro?.na} ({addressDetail?.pro?.sym})
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
