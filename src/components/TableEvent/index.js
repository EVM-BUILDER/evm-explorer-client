import React from 'react'

import { Table } from 'antd'
import { AppstoreOutlined, ContainerOutlined, EyeOutlined, FilterFilled, MenuUnfoldOutlined } from '@ant-design/icons'
import Link from 'components/Link/Link'
import TypeNumber from 'widgets/TypeNumber/index'

const columns = [
  {
    title: 'Txn Hash',
    dataIndex: 'txnHash',
    width: 100,
  },
  {
    title: 'Method ',
    dataIndex: 'method',
    width: 100,
  },
  {
    title: (
      <div>
        <MenuUnfoldOutlined />
        Logs
      </div>
    ),
    dataIndex: 'logs',
    width: 800,
  },
]

const data = [
  {
    key: '1',
    txnHash: (
      <div className="data-txnHash-event">
        <span>
          <Link href="/tx/0x0291a26fa7c9b5488c49f87feb28419bb99e1e7d207a2e61c71542f333b7664c">
            0x0291a26fa7c9b5488c49f87feb28419bb99e1e7d207a2e61c71542f333b7664c
          </Link>
        </span>
        <div className="data-txtHash-div">
          #<Link className="data-txtHash-div-a">27111182</Link>
          <Link>
            <FilterFilled />
          </Link>
        </div>
        <span>
          <span>12 secs ago</span>
        </span>
      </div>
    ),
    method: (
      <div className="data-method-event">
        <span className="data-method-event-hash">0xbab6e81e</span>
        <span>
          dailyLog
          <span className="data-method-event-string">(string)</span>
        </span>
      </div>
    ),
    logs: (
      <div className="data-logs-event">
        DailyTrackerCheckInDone
        <span>
          (<span className="text-success">address</span>
          <span className="text-danger">userAddress</span>,<span className="text-success">uint256</span>
          <span className="text-danger">blockTimestamp</span>,<span className="text-success">string</span>
          <span className="text-danger">uniqueUuid</span>)
        </span>
        <br />
        <span className="data-logs-event-lastChild">
          [topic0] 0x2a5027905e5bec087df40ec0f819f8b617d6b6660dbc2e851c13ad783393b287
          <Link>
            <FilterFilled />
          </Link>
          <table>
            <TypeNumber />
          </table>
        </span>
      </div>
    ),
  },
]
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra)
}
const TableEvent = () => (
  <div>
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
)

export default TableEvent
