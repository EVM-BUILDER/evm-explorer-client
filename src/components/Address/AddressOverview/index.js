import React, { Fragment } from 'react'
import CardBase from 'components/Card/CardBase'
import { Link } from 'components/Link'
import { Col, Dropdown, Menu, Row } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ArrowUpDownIcon, FolderIcon } from 'widgets/Svg'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'
import { ADDRESS_TYPE } from 'redux/constants'
import BigNumber from 'bignumber.js'
import { useSettings } from 'redux/settings/hooks'

const AddressOverview = ({ addressType, nativeToken, addressDetail, statistics, balancesErc20, balancesErc721 }) => {
  const statisticsFirstItem = statistics?.[0]
  // const statisticSecondItem = statistics?.[1]

  const { appearance, chain } = useSettings()

  const totalTokenInAddress = (balancesErc20?.total || 0) + (balancesErc721?.total || 0)

  console.log('statisticsFirstItem', statisticsFirstItem)
  console.log('addressDetail', addressDetail)
  return (
    <div className="card_address_overview">
      <CardBase
        title={addressType !== ADDRESS_TYPE.address ? 'Contract Overview' : 'Overview'}
        backgroundHeader={appearance?.card?.header_bg_color}
        backgroundBody={appearance?.card?.body_bg_color}
        content={
          <>
            <Row className="card_address_overview_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                Balance:
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <FormatAmount
                  value={roundNumber(addressDetail?.data?.v, { decimals: addressDetail?.data?.pro?.de, scale: 5 })}
                  suffix={` ${nativeToken?.symbol || ''}`}
                />
              </Col>
            </Row>

            <Row className="card_address_overview_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
              <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                {chain.native.symbol} Value:
              </Col>

              {statisticsFirstItem && addressDetail && (
                <Col xs={{ span: 24 }} md={{ span: 16 }} className="content">
                  <FormatAmount
                    prefix="$"
                    value={roundNumber(
                      statisticsFirstItem?.tp?.cur * new BigNumber(addressDetail?.data?.v).shiftedBy(-18).toNumber(),
                    )}
                  />
                  <span>
                    {statisticsFirstItem && (
                      <FormatAmount
                        value={roundNumber(statisticsFirstItem?.tp?.cur, { scale: 5 })}
                        prefix={` (@ $`}
                        suffix={`/${nativeToken.symbol || ''})`}
                      />
                    )}
                  </span>
                </Col>
              )}
            </Row>

            {totalTokenInAddress && totalTokenInAddress > 0 ? (
              <Row className="card_address_overview_item" gutter={[{ xs: 10 }, { xs: 10 }]}>
                <Col xs={{ span: 24 }} md={{ span: 8 }} className="title">
                  Token:
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 16 }} className="content">
                  <Row gutter={{ xs: 12, md: 4, lg: 16 }}>
                    <Col xs={{ span: 21 }}>
                      <Dropdown
                        trigger={['click']}
                        overlay={
                          <ul className="address_dropdown_menu">
                            <li>
                              <input placeholder="Search for Token name" onClick={(e) => e.stopPropagation()} />
                            </li>

                            {/* Erc20 */}
                            <li>
                              <ul>
                                <li className="search-token-result" onClick={(e) => e.stopPropagation()}>
                                  <span>PN-20 Tokens ({balancesErc20?.total > 100 ? '>100' : balancesErc20?.total})</span>
                                  <ArrowUpDownIcon />
                                </li>

                                {balancesErc20?.data?.map((item) => (
                                  <li key={item?.ta?.a}>
                                    <Link className="result-item" href={`/token/${item?.ta?.a}?a=${addressDetail?.data?.a}`}>
                                      <img src={item?.ta?.pro?.ico || '/images/logo/eth.png'} alt="logo" />
                                      <div className="result-item-text">
                                        <span>
                                          {item?.ta?.pro?.na} ({item?.ta?.pro?.sym})
                                        </span>
                                        <span>
                                          <FormatAmount
                                            value={roundNumber(item?.v, { scale: 6 })}
                                            suffix={` ${item?.ta?.pro?.sym}`}
                                          />{' '}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                            {/* Erc721 */}
                            <li>
                              <ul>
                                <li className="search-token-result" onClick={(e) => e.stopPropagation()}>
                                  <span>PN-721 Tokens ({balancesErc721?.total > 100 ? '>100' : balancesErc721?.total})</span>
                                  <ArrowUpDownIcon />
                                </li>

                                {balancesErc721?.data?.map((item) => (
                                  <li key={item?.ta?.a}>
                                    <div className="result-item">
                                      <img src={item?.ta?.pro?.ico || '/images/logo/eth.png'} alt="logo" />
                                      <div className="result-item-text">
                                        <span>
                                          {item?.ta?.pro?.na} ({item?.ta?.pro?.sym})
                                        </span>
                                        <span>
                                          <FormatAmount
                                            value={roundNumber(item?.v, { scale: 6 })}
                                            suffix={` ${item?.ta?.pro?.sym}`}
                                          />{' '}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        }
                      >
                        <div className="dropdown">
                          <div>
                            <span>$0.00</span>
                            <span className="bagger">{totalTokenInAddress > 100 ? '>100' : totalTokenInAddress}</span>
                          </div>
                          <DownOutlined />
                        </div>
                      </Dropdown>
                    </Col>

                    <Col xs={{ span: 3 }} className="folder">
                      <FolderIcon />
                    </Col>
                  </Row>
                </Col>
              </Row>
            ) : (
              ''
            )}
          </>
        }
      />
    </div>
  )
}

export default AddressOverview
