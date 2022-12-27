import React from 'react'
import { Progress, Table } from 'antd'
import { DownloadOutlined, PieChartFilled } from '@ant-design/icons'
import Link from 'components/Link/Link'

const Holders = () => {
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      // width: 50,
      render: () => <div className="data-rank">1</div>,
    },
    {
      title: <div className="title-age">Address</div>,
      dataIndex: 'address',
      key: 'address',
      // width: 80,
      render: () => (
        <Link href="token/0xe7e2cb8c81c10ff191a73fe266788c9ce62ec754" className="data-txnHash">
          0xe7e2cb8c81c10ff191a73fe266788c9ce62ec754
        </Link>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      // width: 30,
      render: () => <div className="data-quantity">259</div>,
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      // width: 100,
      render: () => (
        <div className="data-percentage">
          0.0000%
          <span>
            <Progress percent={30} />
          </span>
        </div>
      ),
    },
  ]
  return (
    <div className="token_token">
      <div className="main-under-card-content">
        <div className="card-content-text-holder">
          <Link href="#">
            <PieChartFilled />
            Token Holders Chart
          </Link>
          <span className="card-content-text-holder-span"> Top 1,000 holders (From a total of 16,623 holders)</span>
        </div>
        <div className="card-content-table">
          <Table columns={columns} dataSource={[]} />
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

export default Holders
