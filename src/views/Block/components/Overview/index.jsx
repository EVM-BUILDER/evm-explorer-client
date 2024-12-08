import React, { useEffect, useState } from 'react'
import { Space, Row, Col, Spin, Tooltip } from 'antd'
import { LeftOutlined, RightOutlined, ClockCircleOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import ReactTimeAgo from 'react-time-ago'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'components/Link'
import siteConfig from 'config/site.config'
import fetchHelper from 'library/helpers/FetchHelper'
import { formatAddress, numberFormatter } from 'library/helpers/CommonHelper'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'
import CoppyText from 'components/Coppy/CoppyText'
import axios from 'axios'
const Overview = () => {
    const router = useRouter()

    const { blockDetail, loading } = useSelector((state) => state.Blocks)
    const { settings } = useSelector((state) => state.Settings)
    const [collapse, setCollapse] = useState(false)
    const [parentHash, setParentHash] = useState('')
    const [currentBlock, setCurrentBlock] = useState(0)

    const onGetBlockViaApi = async () => {
        fetchHelper
            .fetch(`${siteConfig.apiUrl}/block/${parseInt(blockDetail?.number, 16)}`, {
                method: 'GET',
            })
            .then(([data, status]) => {
                setCurrentBlock(data.data)
            })
    }

    useEffect(() => {
        if (blockDetail?.number) {
            onGetBlockViaApi()
        }
    }, [blockDetail?.number])

    console.log('currentBlock', currentBlock)

    const collapseToggle = () => {
        setCollapse(!collapse)
    }
    const onGetBockByHash = async (hash) => {
        const res = await axios.post(`${settings?.chain?.rpc}/`, {
            jsonrpc: '2.0',
            method: 'eth_getBlockByHash',
            params: [hash, false],
            id: 1,
        })
        if (res.data.result) {
            setParentHash(res?.data?.result?.number)
            setCurrentBlock(res?.data?.result)
        }
    }

    useEffect(() => {
        if (blockDetail?.parentHash) {
            onGetBockByHash(blockDetail?.parentHash)
        }
    }, [blockDetail])

    const price = blockDetail?.p || 0

    if (!blockDetail) return <></>

    function hexToBinary(hexString) {
        hexString = hexString.replace(/^0x/, '')

        // Initialize an empty string to store the binary representation
        let binaryString = ''

        // Iterate over each character in the hexadecimal string
        for (let i = 0; i < hexString.length; i++) {
            // Convert the current character to its decimal representation
            const decimalValue = parseInt(hexString[i], 16)

            // Convert the decimal value to its binary representation with 4 digits
            // Use padStart to ensure each binary string is 4 characters long
            const binaryValue = decimalValue.toString(2).padStart(4, '0')

            // Append the binary representation to the result string
            binaryString += binaryValue
        }

        return binaryString
    }

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
                    {settings?.chain?.consensus === 'pow' ? (
                        <div className="card-content-item ">
                            <Row>
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Tooltip title="A block producer who successfully included the block onto the blockchain.">
                                        <img src="/images/icon/question.svg" alt="" />
                                    </Tooltip>
                                    <span>Miner:</span>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Link href={`/address/${blockDetail?.miner}`}>
                                            <span className="item-fee-recipient">{blockDetail?.miner}</span>
                                        </Link>
                                        <CoppyText value={blockDetail?.miner}>
                                            <img style={{ marginLeft: '10px' }} src="/images/icon/folder.svg" alt="" />
                                        </CoppyText>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div className="card-content-item ">
                            <Row>
                                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                                    <Tooltip title="The hash of a block is a unique identifier that is created using the block's data and is used to identify the block in the blockchain.">
                                        <img src="/images/icon/question.svg" alt="" />
                                    </Tooltip>
                                    <span>Fee Recipient:</span>
                                </Col>
                                <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                    <Link href={`/address/${currentBlock?.vb?.a || ''}`}>
                                        <span className="item-fee-recipient">{currentBlock?.vb?.a}</span>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    )}

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
                                    <Link href={`/txs?block=${blockDetail?.number}`}>
                                        <div style={{ color: 'var(--text)' }}>
                                            {blockDetail?.transactions?.length || 0} transactions
                                        </div>
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
                    {/* <div className="card-content-item ">
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
                    </div> */}
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
                                <Tooltip title="Validated solution to the cryptopuzzle for this block.">
                                    <img src="/images/icon/question.svg" alt="" />
                                </Tooltip>
                                <span>Codeword:</span>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 16 }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                    className="reward-text"
                                >
                                    {blockDetail.codeword
                                        ? parseInt(blockDetail.codeword, 16).toString(2).substring(0, 66) + '…'
                                        : '-'}
                                </span>
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
                                    {parseInt(blockDetail?.difficulty, 16).toLocaleString() || ''} decodings /{' '}
                                    {blockDetail?.difficulty && blockDetail?.codelength
                                        ? Number(
                                              parseInt(blockDetail?.difficulty, 16) *
                                                  (435 * parseInt(blockDetail?.codelength, 16) + 26020),
                                          ).toLocaleString()
                                        : '0'}{' '}
                                    {settings?.chain?.native?.symbol || ''}
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
                                    {parseInt(blockDetail?.totalDifficulty, 16).toLocaleString() || ''} decodings
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
                                    {Number(parseInt(blockDetail.baseFeePerGas || 0, 16) / 1e9).toFixed(9)}{' '}
                                    {settings?.chain?.unit || 'wei'}
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
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link href={`/block/${+parseInt(blockDetail?.number, 16) - 1}`}>
                                                <span className="reward-text">{blockDetail?.hash || ''}</span>
                                            </Link>
                                            <CoppyText value={blockDetail?.hash}>
                                                <img style={{ marginLeft: '10px' }} src="/images/icon/folder.svg" alt="" />
                                            </CoppyText>
                                        </div>
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
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link href={`/block/${parseInt(parentHash)}`}>
                                                <span className="reward-text"> {blockDetail?.parentHash || ''}</span>
                                            </Link>
                                            <CoppyText value={blockDetail?.parentHash}>
                                                <img style={{ marginLeft: '10px' }} src="/images/icon/folder.svg" alt="" />
                                            </CoppyText>
                                        </div>
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
