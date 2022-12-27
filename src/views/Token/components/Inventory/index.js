import React from 'react'
import { Table } from 'antd'
import { DownloadOutlined, PieChartFilled } from '@ant-design/icons'
import Link from 'components/Link/Link'

const Inventory = () => {
  const columnsdataInventory = [
    {
      title: 'Token_id',
      dataIndex: 'token_id',
      key: 'rank',
      // width: 50,
      render: () => (
        <Link
          href="/token/109496029383283026169133105264679942361946356211481778062746824431790156939265"
          className="data-tokenId"
        >
          109496029383283026169133105264679942361946356211481778062746824431790156939265
        </Link>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'quantity',
      // width: 30,
      render: () => (
        <Link href="token/0x0000000000000000000000000000000000000000" className="data-owner">
          0x0000000000000000000000000000000000000000
        </Link>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      // width: 30,
      render: () => (
        <div href="token/94" className="data-amount">
          94
        </div>
      ),
    },
  ]

  return (
    <div className="token_inventory">
      <div className="main-under-card-content">
        <div className="card-content-text">
          <div>
            <span> Latest 10,000 active tokens (From a total of 646,757 tokens)</span>
          </div>
        </div>
        <div className="card-content-table">
          <Table columns={columnsdataInventory} dataSource={[]} />
        </div>
        <div className="card-content-footer">
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
        </div>
      </div>
    </div>
  )
}

export default Inventory
