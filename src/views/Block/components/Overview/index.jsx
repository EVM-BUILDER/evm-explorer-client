import React, { useState } from 'react'
import { Space, Row, Col, Spin, Tooltip } from 'antd'
import { LeftOutlined, RightOutlined, ClockCircleOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import ReactTimeAgo from 'react-time-ago'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'components/Link'
import { formatAddress, numberFormatter } from 'library/helpers/CommonHelper'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'

const Overview = () => {
    const router = useRouter()

    const { blockDetail, loading } = useSelector((state) => state.Blocks)
    const { settings } = useSelector((state) => state.Settings)
    console.log('blockDetail', blockDetail)
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
                    <div className="card-content-item  ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="The block height of a particular block is defined as the number of blocks preceding it in the blockchain.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Block Height:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="item-hash">{parseInt(blockDetail?.number, 16)}</span>
                                <Link href={`/block/${+parseInt(blockDetail?.number, 16) - 1}`} className="item-leftRight">
                                    <LeftOutlined />
                                </Link>
                                <Link href={`/block/${+parseInt(blockDetail?.number, 16) + 1}`} className="item-leftRight">
                                    <RightOutlined />
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Status:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="item-status">{blockDetail?.tt < 100 ? 'Confirming' : 'Finalized'}</span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="Date & time at which block was produced.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Timestamp:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <Link href="/block" className="item-clock-icons">
                                    <ClockCircleOutlined />
                                </Link>
                                <span className="item-clock">
                                    {blockDetail?.timestamp && (
                                        <>
                                            <ReactTimeAgo date={parseInt(blockDetail?.timestamp) * 1000} locale="en-US" /> (
                                            {new Date(parseInt(blockDetail?.timestamp) * 1000).toISOString()})
                                        </>
                                    )}
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="A block producer who successfully included the block onto the blockchain.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Miner:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <Link>
                                    <span className="item-fee-recipient">{blockDetail?.miner}</span>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    {/* <div className="card-content-item ant-menu-horizontal">
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain."><img src="/images/icon/question.svg" alt="" /></Tooltip>
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
                                <Tooltip title="The number of transactions in the block.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Transactions:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <div className="item-transaction">
                                    <Link className="transaction-link" href={`/txs?block=${blockDetail?.number}`}>
                                        {blockDetail?.transactions?.length || 0} transactions
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
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Fee Recipient:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <Link href={`/address/${blockDetail?.vb?.a || ''}`}>
                                    <span className="item-fee-recipient">{blockDetail?.receiptsRoot}</span>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    {/* <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Block Reward:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="reward-text">{`${blockDetail?.br || '0'} ${
                                    settings?.chain?.native?.symbol || ''
                                }`}</span>
                            </Col>
                        </Row>
                    </div> */}
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="expected number of decodings/operations to hit the right answer.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Difficulty:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="item-total-difficulty">
                                    {parseInt(blockDetail?.difficulty, 16) || ''} decodings
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="Total difficulty of the chain until this block.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Total Difficulty:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="item-total-difficulty">
                                    {parseInt(blockDetail?.totalDifficulty, 16) || ''} decodings
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ant-menu-horizontal">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="Size of the block in bytes.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Size:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="reward-text">
                                    {' '}
                                    <CurrencyFormat
                                        value={parseInt(blockDetail?.size || 0)}
                                        displayType="text"
                                        thousandSeparator
                                        renderText={(value) => value}
                                    />{' '}
                                    bytes
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="The total gas amount used in the block and its percentage of gas filled in the block.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Gas Used:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }} style={{ display: 'flex' }}>
                                <span className="item-text">
                                    <CurrencyFormat
                                        value={parseInt(blockDetail?.gasUsed || 0)}
                                        displayType="text"
                                        thousandSeparator
                                        renderText={(value) => value}
                                    />{' '}
                                    (
                                    {((parseInt(blockDetail?.gasUsed || 0) / parseInt(blockDetail?.gasLimit || 0)) * 100).toFixed(
                                        1,
                                    )}
                                    %)
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="Total gas limit provided by all transactions in the block.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Gas Limit:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="reward-text">
                                    <CurrencyFormat
                                        value={parseInt(blockDetail.gasLimit)}
                                        displayType="text"
                                        thousandSeparator
                                        renderText={(value) => value}
                                    />
                                </span>
                            </Col>
                        </Row>
                    </div>
                    {/* {blockDetail?.baseFeePerGas && ( */}
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="Minimum fee required per unit of gas. Fee adjusts based on network congestion.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Base Fee Per Gas:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span className="reward-text">
                                    {Number(parseInt(blockDetail.baseFeePerGas || 0, 16) / 1e9).toFixed(9)} wei
                                </span>
                            </Col>
                        </Row>
                    </div>
                    {/* )} */}
                    <div className="card-content-item ">
                        <Row>
                            <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                <Tooltip title="WLC burned from transactions included in the block (Base fee (per unit of gas) * Gas Used).">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Burnt Fees:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <div className="item-burn-fee">
                                    <img src="/images/icon/fire.svg" alt="" />
                                    <span>
                                        {Number(
                                            (parseInt(blockDetail.baseFeePerGas, 16) / 1e9) *
                                                (parseInt(blockDetail.gasUsed, 16) / 1e9) || 0,
                                        ).toFixed(9)}{' '}
                                        {settings?.chain?.native?.symbol || ''}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {collapse && (
                        <div className="card-content-item_show ">
                            {/* <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>Extra Data:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text">{blockDetail.extraData}</span>
                                    </Col>
                                </Row>
                            </div> */}
                            {/* <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>{settings?.chain?.native?.symbol || ''} Price:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <a className="reward-text">
                                            ${price > 0 ? numberFormatter(price, 2) : numberFormatter(price, 5)} /{' '}
                                            {settings?.chain?.native?.symbol || ''}
                                        </a>
                                    </Col>
                                </Row>
                            </div> */}
                            <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="The SHA256 hash of the block.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>Hash:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text">{blockDetail?.hash || ''}</span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="The hash of the block from which this block was generated.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>Parent Hash:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text"> {blockDetail?.parentHash || ''}</span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="Validated solution to the cryptopuzzle for this block.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>Codeword:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text"> {blockDetail?.codeword || ''}</span>
                                    </Col>
                                </Row>
                            </div>

                            <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="Length of the validated solution.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>Codeword length:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text">
                                            {' '}
                                            {blockDetail?.codelength || ''} | Decimal:{' '}
                                            {blockDetail?.codelength ? parseInt(blockDetail?.codelength, 16) : '-'}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                            {/* <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
                                        <span>StateRoot:</span>
                                    </Col>
                                    <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                        <span className="reward-text"> {blockDetail?.stateRoot || ''}</span>
                                    </Col>
                                </Row>
                            </div> */}
                            <div className="card-content-item ">
                                <Row>
                                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                        <Tooltip title="64-bit hash of value verifying proof-of-work (note: null for POA chains).">
                                            <img src="/images/icon/question.svg" alt="" />
                                        </Tooltip>
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
