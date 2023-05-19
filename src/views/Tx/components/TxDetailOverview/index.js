import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Menu, Dropdown, Button, Space, Tabs, Row, Col, message, Spin } from 'antd'
import { ClockCircleOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckCircleOutlined } from '@ant-design/icons'
import moment from 'moment-timezone'
import ReactTimeAgo from 'react-time-ago'
import CurrencyFormat from 'react-currency-format'
import { Link } from 'components/Link'
import CoppyText from 'components/Coppy/CoppyText'
import { roundNumber } from 'library/helpers/Number'
import { WTxDetailOverview } from './styled'
import ToTokenAddress from 'components/Token/ToTokenAddress'
import TokenTransferred from 'components/Token/TokenTransferred'
import { formatAddress } from 'utils/address'

const menuSuccess = (
    <Menu className="success-modal-container">
        <Menu.Item>
            <p className="success-modal-conent" target="_blank" rel="noopener noreferrer">
                Status code indicating if the top-level call succeeded or failed"
            </p>
        </Menu.Item>
    </Menu>
)
const menuBlock = (
    <Menu className="Block-modal-container">
        <Menu.Item>
            <p className="Block-modal-conent" target="_blank" rel="noopener noreferrer">
                Number of blocks validated since
            </p>
        </Menu.Item>
    </Menu>
)

const menuTxn = (
    <Menu className="Block-modal-container">
        <Menu.Item>
            <p className="Block-modal-conent" target="_blank" rel="noopener noreferrer">
                The amount to be transfer to recipient
            </p>
        </Menu.Item>
    </Menu>
)

const TxDetailOverview = ({ loading, transactionDetail, blocks }) => {
    const { settings } = useSelector((state) => state.Settings)
    const { userInfo } = useSelector((state) => state.User)
    const { nativePrice } = useSelector((state) => state.Statistics)

    const [collapse, setCollapse] = useState(false)

    const collapseToggle = () => {
        setCollapse(!collapse)
    }

    const txErc20 = transactionDetail.erc20?.length > 0 ? transactionDetail.erc20 : null
    const txErc721 = transactionDetail.erc721?.length > 0 ? transactionDetail.erc721 : null
    const txErc1155 = transactionDetail.erc1155?.length > 0 ? transactionDetail.erc1155 : null
    const tokenTransferred = txErc20 || txErc721 || txErc1155

    return (
        <WTxDetailOverview>
            {loading ? (
                <div className="loading-wrapper">
                    <Spin />
                </div>
            ) : (
                <>
                    {transactionDetail && (
                        <>
                            <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            Transaction Hash:
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <div className="link-with-copy">
                                            <Link className="text-truncate" href={`/tx/${transactionDetail?.h}`}>
                                                {transactionDetail?.h}
                                            </Link>
                                            <CoppyText value={transactionDetail?.h}>
                                                <img
                                                    className="icon-left"
                                                    style={{ marginLeft: '10px' }}
                                                    src="/images/icon/folder.svg"
                                                    alt=""
                                                />
                                            </CoppyText>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                <Row gutter={[12, 12]}>
                                    <Col xs={10} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            Status:
                                        </div>
                                    </Col>
                                    <Col xs={14} md={16}>
                                        <Dropdown
                                            className={`u-label ${transactionDetail?.s ? 'u-label--success' : 'u-label--danger'}`}
                                            overlay={menuSuccess}
                                            placement="topRight"
                                        >
                                            <span>
                                                <CheckCircleOutlined />
                                                {transactionDetail?.s ? 'Success' : 'Fail'}
                                            </span>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            Block:
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <CheckCircleOutlined />
                                        <Link href={`/block/${transactionDetail?.bn}`} className="item-clock">
                                            {transactionDetail?.bn}
                                        </Link>

                                        {blocks?.[0]?.bn && (
                                            <span className="item-block-stickers">
                                                <Space>
                                                    <Dropdown
                                                        className="non-position-item-span"
                                                        overlay={menuBlock}
                                                        placement="topRight"
                                                    >
                                                        <Button>
                                                            {blocks?.[0]?.bn - transactionDetail?.bn} Block Confirmations
                                                        </Button>
                                                    </Dropdown>
                                                </Space>
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ant-menu-horizontal ">
                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            Timestamp:
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <Link href="/" className="item-timestamp-icons">
                                            <ClockCircleOutlined />
                                        </Link>
                                        <span className="item-clock-time">
                                            {transactionDetail?.ti && (
                                                <>
                                                    <ReactTimeAgo date={parseInt(transactionDetail?.ti) * 1000} locale="en-US" />{' '}
                                                    (
                                                    {moment(new Date(transactionDetail?.ti * 1000))
                                                        .utc()
                                                        .format('MMM-DD-YYYY HH:mm:ss A') + ' +UTC'}
                                                    )
                                                </>
                                            )}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            From:
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        {transactionDetail?.f?.a && (
                                            <div className="link-with-copy">
                                                <Link className="text-truncate" href={`/address/${transactionDetail?.f?.a}`}>
                                                    {formatAddress(transactionDetail?.f)}
                                                </Link>
                                                <CoppyText value={transactionDetail?.f?.a}>
                                                    <img
                                                        className="icon-right"
                                                        style={{ marginLeft: '10px' }}
                                                        src="/images/icon/folder.svg"
                                                        alt=""
                                                    />
                                                </CoppyText>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                            <div className="card-content-item ant-menu-horizontal ">
                                <Row gutter={[12, 12]}>
                                    <Col xs={24} md={8}>
                                        <div className="tx-left-title">
                                            <Space>
                                                <img src="/images/icon/question.svg" alt="" />
                                            </Space>
                                            To:
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <ToTokenAddress txDetail={transactionDetail} />
                                    </Col>
                                </Row>
                            </div>

                            {tokenTransferred && (
                                <div className="card-content-item ant-menu-horizontal ">
                                    <Row gutter={[12, 12]}>
                                        <Col xs={24} md={8}>
                                            <div className="tx-left-title">
                                                <Space>
                                                    <img src="/images/icon/question.svg" alt="" />
                                                </Space>
                                                Tokens Transferred:
                                            </div>
                                        </Col>
                                        <Col xs={24} md={16}>
                                            {tokenTransferred.map((item) => {
                                                return <TokenTransferred key={item.ca} tokenTransfer={item} />
                                            })}
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            {transactionDetail && (
                                <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                    <Row gutter={[12, 12]}>
                                        <Col xs={24} md={8}>
                                            <div className="tx-left-title">
                                                <Space>
                                                    <img src="/images/icon/question.svg" alt="" />
                                                </Space>
                                                Value:
                                            </div>
                                        </Col>
                                        <Col xs={24} md={16}>
                                            {transactionDetail?.v && <Space>
                                                <Dropdown
                                                    className="card-content-item-value"
                                                    overlay={menuTxn}
                                                    placement="topRight"
                                                >
                                                    <span>
                                                        {(transactionDetail?.v > 1e9 ? transactionDetail?.v / 1e18 : transactionDetail?.v)?.toLocaleString('en-GB', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 10,
                                                        }) || 0}{' '}
                                                        {transactionDetail?.v > 1e9 ? (settings?.chain?.native?.symbol || '') : 'wei'}
                                                    </span>
                                                </Dropdown>
                                                <span className="card-content-item-price">(${(transactionDetail?.v / 1e18 * roundNumber(nativePrice?.price, { scale: 5 })).toLocaleString('en-GB', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 10,
                                                })})</span>
                                            </Space>}
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            {/*  */}
                            {transactionDetail && (
                                <div className="card-content-item ant-menu-horizontal ">
                                    <Row gutter={[12, 12]}>
                                        <Col xs={24} md={8}>
                                            <div className="tx-left-title">
                                                <Space>
                                                    <img src="/images/icon/question.svg" alt="" />
                                                </Space>
                                                Transaction Fee:
                                            </div>
                                        </Col>
                                        <Col xs={24} md={16}>
                                            <Space wrap>
                                                <span className="card-content-item-value">
                                                    {transactionDetail?.tf / 1e18 || 0} {settings?.chain?.native?.symbol || ''}
                                                </span>
                                                <span className="card-content-item-price">
                                                    (${((((transactionDetail?.gp / 1e9) * transactionDetail.gu) / 1e9) * roundNumber(nativePrice?.price, { scale: 5 })).toLocaleString('en-GB', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 10,
                                                    })})
                                                </span>
                                            </Space>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            {collapse && (
                                <div className="card-content-item_show">
                                    <div className="card-content-item ant-menu-horizontal no-border-bottom">
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} md={8}>
                                                <div className="tx-left-title">
                                                    <Space>
                                                        <img src="/images/icon/question.svg" alt="" />
                                                    </Space>
                                                    Gas Price:
                                                </div>
                                            </Col>
                                            <Col xs={24} md={16}>
                                                {roundNumber(transactionDetail?.gp, { scale: false, decimals: 18 })}{' '}
                                                {settings?.chain?.native?.symbol || ''} (
                                                {roundNumber(transactionDetail?.gp, { decimals: 9, scale: 3 })} Gwei)
                                            </Col>
                                        </Row>
                                    </div>
                                    {/* <div className="card-content-item ant-menu-horizontal">
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} md={8}>
                                                <Space>
                                                    <img src="/images/icon/question.svg" alt="" />
                                                </Space>
                                                {settings?.chain?.native?.symbol || ''} Price:
                                            </Col>
                                            <Col xs={24} md={16}>
                                                {transactionDetail?.p
                                                    ? numberFormatter(transactionDetail?.p, transactionDetail?.p > 0 ? 2 : 5)
                                                    : 0}
                                            </Col>
                                        </Row>
                                    </div> */}
                                    <div className="card-content-item ant-menu-horizontal">
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} md={8}>
                                                <Space>
                                                    <img src="/images/icon/question.svg" alt="" />
                                                </Space>
                                                Input Data:
                                            </Col>
                                            <Col xs={24} md={16}>
                                                <textarea
                                                    className="text-area-private"
                                                    cols="30"
                                                    rows="2"
                                                    value={transactionDetail?.i}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="card-content-item ant-menu-horizontal">
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} md={8}>
                                                <div className="tx-left-title">
                                                    <Space>
                                                        <img src="/images/icon/question.svg" alt="" />
                                                    </Space>
                                                    Private Note:
                                                </div>
                                            </Col>
                                            <Col xs={24} md={16}>
                                                {userInfo?.username ? (
                                                    <textarea className="text-area-private" cols="30" rows="2" />
                                                ) : (
                                                    <span className="text-private">
                                                        To access the Private Note feature, you must be{' '}
                                                        <Link href="/login">Logged In</Link>
                                                    </span>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )}
                            <div className="card-content-item ant-menu-horizontal no-border-bottom">
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
                        </>
                    )}
                </>
            )}
        </WTxDetailOverview>
    )
}

export default TxDetailOverview
