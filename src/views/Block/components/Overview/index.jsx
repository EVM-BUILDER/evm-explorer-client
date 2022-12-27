import React, { useState } from 'react'
import { Space, Row, Col, Spin } from 'antd'
import { LeftOutlined, RightOutlined, ClockCircleOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import ReactTimeAgo from 'react-time-ago'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'components/Link'
import { numberFormatter } from 'library/helpers/CommonHelper'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Overview = () => {
  const router = useRouter()

  const { blockDetail, loading } = useSelector((state) => state.Blocks)
  const { settings } = useSelector((state) => state.Settings)

  const [collapse, setCollapse] = useState(false)

  const collapseToggle = () => {
    setCollapse(!collapse)
  }

  const price = blockDetail?.p || 0

  if (!blockDetail) return <></>

  return (
    <div className="card-content">
      {loading ? (
        <div className="loading-wrapper">
          <Spin />
        </div>
      ) : (
        <div className="card-content-show">
          <div className="card-content-item ant-menu-horizontal ">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Block Height:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="item-hash">{blockDetail?.bn}</span>
                <Link href={`/block/${+blockDetail?.bn - 1}`} className="item-leftRight">
                  <LeftOutlined />
                </Link>
                <Link href={`/block/${+blockDetail?.bn + 1}`} className="item-leftRight">
                  <RightOutlined />
                </Link>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Status:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="item-status">{blockDetail?.tt < 100 ? 'Confirming' : 'Finalized'}</span>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Timestamp:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <Link href="/block" className="item-clock-icons">
                  <ClockCircleOutlined />
                </Link>
                <span className="item-clock">
                  {blockDetail?.ti && (
                    <>
                      <ReactTimeAgo date={parseInt(blockDetail?.ti) * 1000} locale="en-US" /> (
                      {new Date(parseInt(blockDetail?.ti) * 1000).toISOString()})
                    </>
                  )}
                </span>
              </Col>
            </Row>
          </div>
          {/* <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Proposed On:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <div className="item-proposed">
                  Block proposed on slot
                  <Link href={`/slot/5052115`}>
                    <span> 5052115</span>
                  </Link>
                  , epoch{' '}
                  <Link href={`/epoch/157878`}>
                    <span>157878</span>
                  </Link>
                </div>
              </Col>
            </Row>
          </div> */}
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Transactions:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <div className="item-transaction">
                  <Link className="transaction-link" href={`/txs?block=${blockDetail?.bn}`}>
                    {blockDetail?.tt || 0} transactions
                  </Link>
                  {/* and
                  <Link className="transaction-link" href={`/txsInternal?block=${blockDetail?.bn}`}>
                    {blockDetail?.tt || 0} contact internal transactions
                  </Link>
                  in this block */}
                </div>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Fee Recipient:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <Link href={`/address/${blockDetail?.vb?.a}`}>
                  <span className="item-fee-recipient">{blockDetail?.vb?.a || ''}</span>
                </Link>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Block Reward:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="reward-text">{`${blockDetail?.br || '0'} ${settings?.chain?.native?.symbol || ''}`}</span>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Total Difficulty:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="item-total-difficulty">{blockDetail?.td || ''}</span>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Size:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="reward-text">
                  {' '}
                  <CurrencyFormat
                    value={parseInt(blockDetail?.sz || 0)}
                    displayType="text"
                    thousandSeparator
                    renderText={(value) => value}
                  />{' '}
                  bytes
                </span>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Gas Used:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }} style={{ display: 'flex' }}>
                <span className="item-text">
                  <CurrencyFormat
                    value={parseInt(blockDetail?.gu || 0)}
                    displayType="text"
                    thousandSeparator
                    renderText={(value) => value}
                  />{' '}
                  ({((blockDetail.gu / blockDetail.gl) * 100).toFixed(1)}%)
                </span>
              </Col>
            </Row>
          </div>
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Gas Limit:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <span className="reward-text">
                  <CurrencyFormat
                    value={parseInt(blockDetail.gl)}
                    displayType="text"
                    thousandSeparator
                    renderText={(value) => value}
                  />
                </span>
              </Col>
            </Row>
          </div>
          {blockDetail?.baseFeePerGas && (
            <div className="card-content-item ant-menu-horizontal">
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <img src="/images/icon/question.svg" alt="" />
                  <span>Base Fee Per Gas:</span>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                  <span className="reward-text">{blockDetail.baseFeePerGas} wei</span>
                </Col>
              </Row>
            </div>
          )}
          <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <img src="/images/icon/question.svg" alt="" />
                <span>Burnt Fees:</span>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 16 }}>
                <div className="item-burn-fee">
                  <img src="/images/icon/fire.svg" alt="" />
                  <span>
                    {blockDetail?.f || 0} {settings?.chain?.native?.symbol || ''}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          {collapse && (
            <div className="card-content-item_show ant-menu-horizontal">
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>Extra Data:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <span className="reward-text">{blockDetail.e}</span>
                  </Col>
                </Row>
              </div>
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>{settings?.chain?.native?.symbol || ''} Price:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <a className="reward-text">
                      ${price > 0 ? numberFormatter(price, 2) : numberFormatter(price, 5)} /{' '}
                      {settings?.chain?.native?.symbol || ''}
                    </a>
                  </Col>
                </Row>
              </div>
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>Hash:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <span className="reward-text">{blockDetail?.h || ''}</span>
                  </Col>
                </Row>
              </div>
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>Parent Hash:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <span className="reward-text"> {blockDetail?.ph || ''}</span>
                  </Col>
                </Row>
              </div>
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>StateRoot:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <span className="reward-text"> {blockDetail?.sn || ''}</span>
                  </Col>
                </Row>
              </div>
              <div className="card-content-item ant-menu-horizontal">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    <img src="/images/icon/question.svg" alt="" />
                    <span>Nonce:</span>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 16 }}>
                    <span className="reward-text"> {blockDetail?.nonce || ''}</span>
                  </Col>
                </Row>
              </div>
            </div>
          )}
          <a className="collapse-click" onClick={collapseToggle}>
            <span>
              Click to see
              {collapse === true ? <span>less</span> : <span>more</span>}
              <span>
                {collapse === true ? (
                  <Space>
                    <ArrowUpOutlined />
                  </Space>
                ) : (
                  <Space>
                    <ArrowDownOutlined />
                  </Space>
                )}
              </span>
            </span>
          </a>
        </div>
      )}
    </div>
  )
}

export default Overview
