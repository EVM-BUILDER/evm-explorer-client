import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Link } from 'components/Link'
import { formatAddress, formatCode, numberFormatter } from 'library/helpers/CommonHelper'
import { useSelector } from 'react-redux'
import ToTokenAddress from 'components/Token/ToTokenAddress'

const TableItemTransactions = ({ dataItem }) => {
    const { settings } = useSelector((state) => state.Settings)

    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="col-sm-4-content">
                    <div className="display-none">
                        <span className="non-outside">
                            <span className="non-inside">TX</span>
                        </span>
                    </div>
                    <div className="display-block-transactions">
                        <div className="col-sm-4-content-block">Tx#</div>
                        <Link href={`/tx/${dataItem?.h}`}>{formatCode(dataItem?.h, 8, 5)}</Link>
                        <p className="block-small-transactions">
                            <ReactTimeAgo date={parseInt(dataItem?.ti || 0) * 1000} locale="en-US" timeStyle="round" />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-sm-8">
                <div className="content-transactions">
                    <div className="show-content-transactions">
                        <span>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <span>From</span>
                                <Link href={`/address/${dataItem?.f?.a || ''}`} className="content-hasktag">
                                    {formatAddress(dataItem?.f)}
                                </Link>
                            </div>
                            <div style={{ whiteSpace: 'nowrap' }}>
                                <span>To </span>
                                {dataItem?.ca ? (
                                    <Link href={`/address/${dataItem?.ca?.a || ''}`}>{formatAddress(dataItem?.ca)}</Link>
                                ) : dataItem?.t ? (
                                    <Link href={`/address/${dataItem?.t?.a || ''}`}>{formatAddress(dataItem?.t)}</Link>
                                ) : (
                                    <Link>Unknown</Link>
                                )}
                            </div>
                        </span>
                        <div>
                            <div className="show-content-hide-transactions">
                                {dataItem?.v ? (
                                    <div className="content-text">
                                        {(dataItem?.v > 1e9 ? dataItem?.v / 1e18 : dataItem?.v)?.toLocaleString('en-GB', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 10,
                                        }) || 0}{' '}
                                        {dataItem?.v > 1e9 ? settings?.chain?.native?.symbol || '' : 'wei'}
                                    </div>
                                ) : (
                                    <div className="content-text">{`0 ${settings?.chain?.native?.symbol || ''}`}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hide-content-transactions">
                        {dataItem?.v ? (
                            <div className="content-text">
                                {(dataItem?.v > 1e9 ? dataItem?.v / 1e18 : dataItem?.v)?.toLocaleString('en-GB', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 10,
                                }) || 0}{' '}
                                {dataItem?.v > 1e9 ? settings?.chain?.native?.symbol || '' : 'wei'}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableItemTransactions
