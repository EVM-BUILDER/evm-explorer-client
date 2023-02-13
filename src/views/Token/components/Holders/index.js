import React from 'react'
import { useRouter } from 'next/router'
import { Progress } from 'antd'
import Link from 'components/Link/Link'
import { ChartIcon, HealthIcon } from 'widgets/Svg'
import TableBase from 'components/Table/TableBase'
import Pagination from 'components/Table/Pagination'
import FormatAmount from 'components/FormatAmount'
import { formatBigNumber, roundNumber } from 'library/helpers/Number'
import NextLink from 'components/Link/Link'
import useTokenHolders from 'hooks/useTokenHolders'

const Holders = ({ addressDetail }) => {
    const { query } = useRouter()
    const { holders, paramsTokenHolder, setParamsTokenHolder } = useTokenHolders(query.token)
    // console.log('holders', holders)

    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            width: 60,
            render: (_, __, index) => {
                const page = paramsTokenHolder.page
                const pageSize = paramsTokenHolder.page_size
                return <div className="data-rank">{(page - 1) * pageSize + index + 1}</div>
            },
        },
        {
            title: 'Address',
            dataIndex: 'a',
            render: (_, record) => (
                <Link href={`/address/${record.a.a}`} className="hash-tag text-truncate">
                    {record.a.a}
                </Link>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'v',
            render: (text, record) => (
                <div className="data-quantity">
                    <FormatAmount value={text ?? 0} />
                </div>
            ),
        },
        {
            title: 'Percentage',
            dataIndex: 'v',
            render: (text) => {
                const tsu = addressDetail?.pro?.tsu || 0
                const percentByTotal = (text * 100) / tsu
                return (
                    <div className="data-percentage">
                        <span>{percentByTotal ? percentByTotal.toFixed() : 0}%</span>
                        <span>
                            <Progress percent={percentByTotal || 0} showInfo={false} />
                        </span>
                    </div>
                )
            },
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: () => <div className="data-value">{/* $3,243,254,665.96 */}--</div>,
        },
        // {
        //   title: 'Analytics',
        //   dataIndex: 'a',
        //   render: (_, record) => (
        //     <div className="data-analytics">
        //       <NextLink href={`/token/${addressDetail?.a}?a=${record.a.a}#tokenAnalytics`}>
        //         <ChartIcon />
        //       </NextLink>
        //     </div>
        //   ),
        // },
    ]

    return (
        <div className="token-card-holders">
            <div className="card-content">
                <div className="card-content-header">
                    <div className="content-top">
                        <span />
                        {/* <Link href="#">
              <HealthIcon />
              Token Holders Chart
            </Link> */}
                        <span>(Holders Snapshot taken 5 mins ago)</span>
                    </div>

                    <div className="content-bottom">
                        <span>
                            Top {holders?.total > 1000 ? '1,000' : holders?.total} holders (From a total of {holders?.total || 0}{' '}
                            holders)
                        </span>
                        <Pagination
                            total={holders?.total}
                            page={paramsTokenHolder?.page}
                            page_size={paramsTokenHolder?.page_size}
                            showSizeChange={false}
                            onChange={({ page, page_size }) => {
                                setParamsTokenHolder((prev) => {
                                    return {
                                        ...prev,
                                        page,
                                        page_size,
                                    }
                                })
                            }}
                        />
                    </div>
                </div>

                <div className="card-content-table">
                    <TableBase
                        columns={columns}
                        dataSource={holders?.data || []}
                        loading={holders?.loading}
                        scroll={{ x: 600 }}
                        pagination={{
                            total: holders?.total,
                            page: paramsTokenHolder?.page,
                            page_size: paramsTokenHolder?.page_size,
                            showSizeChange: false,
                            onChange: ({ page, page_size }) => {
                                setParamsTokenHolder((prev) => ({
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

export default Holders
