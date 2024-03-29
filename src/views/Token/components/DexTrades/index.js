import React from 'react'

const columns = [
  {
    title: 'Txn Hash',
    dataIndex: 'txnHash',
    render: (text) => <></>,
  },
  {
    title: <p>Age</p>,
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
          <TableBase columns={columns} dataSource={[]} 
                  scroll={{ x: 700 }}
          pagination={{ showSizeChange: false }} />
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default DexTrades
