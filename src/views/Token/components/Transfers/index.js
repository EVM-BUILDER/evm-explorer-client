import React from 'react'
import { useRouter } from 'next/router'
import ReactTimeAgo from 'react-time-ago'
import Link from 'components/Link/Link'
import TableBase from 'components/Table/TableBase'
import { EyeIcon, InfoCircleIcon, RoundArrowIcon } from 'widgets/Svg'
import Pagination from 'components/Table/Pagination'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'

const Transfers = ({ txsErc20, paramsTxsErc20, setParamsTxsErc20 }) => {
    const { query } = useRouter()

    const columns = [
        {
            title: 'Txn Hash',
            dataIndex: 'h',
            render: (text) => (
                <div className="data-txnHash ">
                    <EyeIcon />
                    <Link href={`/tx/${text}`} className="hash-tag  text-truncate">
                        {text}
                    </Link>
                </div>
            ),
        },
        {
            title: (
                <div className="title-method">
                    <span>Method</span>
                    <InfoCircleIcon />
                </div>
            ),
            dataIndex: 'm',
            render: (text) => <div className="data-method">{text}</div>,
        },
        {
            title: <p>Age</p>,
            dataIndex: 'ti',
            render: (ti) => (
                <div className="data-age">
                    <ReactTimeAgo date={parseInt(ti) * 1000} locale="en-US" timeStyle="round" />
                </div>
            ),
        },
        {
            title: 'From',
            dataIndex: 'f',
            render: (f) => (
                <div className="data-from ">
                    <Link className="data-from-link hash-tag text-truncate" href={`token/${query.token}?a=${f.a}`}>
                        {f?.a}
                    </Link>
                </div>
            ),
        },
        {
            title: 'To',
            dataIndex: 't',
            render: (t) => (
                <div className="data-to">
                    <RoundArrowIcon />
                    <Link className="data-to-link hash-tag text-truncate" href={`token/${query.token}?a=${t.a}`}>
                        {t?.a}
                    </Link>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'v',
            render: (v) => (
                <div className="data-quantity">
                    <FormatAmount value={roundNumber(v, { decimals: 18, scale: 6 })} />
                </div>
            ),
        },
    ]

    return (
        <div className="token_table_transfer">
            <div className="card-content">
                <div className="card-content-header">
                    <div className="text">
                        <div>
                            <FormatAmount value={txsErc20?.total} suffix="+ transactions found" />
                        </div>
                        <div>(Showing the last 100k records)</div>
                    </div>
                    <Pagination
                        total={txsErc20?.total}
                        page={paramsTxsErc20?.page}
                        page_size={paramsTxsErc20?.page_size}
                        showSizeChange={false}
                        onChange={({ page, page_size }) => {
                            setParamsTxsErc20((prev) => {
                                return {
                                    ...prev,
                                    page,
                                    page_size,
                                }
                            })
                        }}
                    />
                </div>

                <div className="card-content-table">
                    <TableBase
                        columns={columns}
                        dataSource={txsErc20?.data || []}
                        loading={txsErc20?.loading}
                        scroll={{ x: 700 }}
                        pagination={{
                            total: txsErc20?.total,
                            page: paramsTxsErc20?.page,
                            page_size: paramsTxsErc20?.page_size,
                            showSizeChange: false,
                            onChange: ({ page, page_size }) => {
                                setParamsTxsErc20((prev) => ({
                                    ...prev,
                                    page,
                                    page_size,
                                }))
                            },
                        }}
                    />
                </div>

                {/* <div className="card-content-footer">
          <div className="content-footer-text">
            <span className="content-footer-text-right">
              [ Download
              <Link href="#">CSV Export</Link>
              &nbsp;
              <span>
                <DownloadOutlined />
              </span>
              ]
            </span>
          </div>
        </div> */}
            </div>
        </div>
    )
}

export default Transfers
