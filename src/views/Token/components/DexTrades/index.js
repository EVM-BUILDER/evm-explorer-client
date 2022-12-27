import React from 'react'
import { Table } from 'antd'
import { DownloadOutlined, PieChartFilled } from '@ant-design/icons'
import Link from 'components/Link/Link'
import Pagination from 'components/Table/Pagination'
import TableBase from 'components/Table/TableBase'

const columns = [
  {
    title: 'Txn Hash',
    dataIndex: 'txnHash',
    render: (text) => <></>,
  },
  {
    title: <p style={{ color: '#418143' }}>Age</p>,
    dataIndex: 'age',
    render: () => <></>,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => <></>,
  },
  {
    title: 'Token Amount (Out)',
    dataIndex: 'amountOut',
    render: (text) => <></>,
  },
  {
    title: 'Token Amount (In)',
    dataIndex: 'amountIn',
    render: () => <></>,
  },
  {
    title: 'Txn Value ($)',
    dataIndex: 'value',
    render: () => <></>,
  },
  {
    title: 'DEX',
    dataIndex: 'dex',
    render: () => <></>,
  },
]

const DexTrades = () => {
  return (
    <div className="token-card-trades">
      Coming Soon
      {/* <div className="card-content"> */}
      {/* <div className="card-content-header">
          <div className="text">Top 1,000 holders (From a total of 4,465,972 holders)</div>
          <Pagination showSizeChange={false} />
        </div>

        <div className="card-content-table">
          <TableBase columns={columns} dataSource={[]} pagination={{ showSizeChange: false }} />
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default DexTrades
