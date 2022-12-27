import React from 'react'
import { Spin } from 'antd'
import TableItemTransactions from 'components/TableItemTransactions/TableItemTransactions'

const TableTransactions = ({ transactions }) => {
  return (
    <div className="table-txs-body">
      <div className="table-body-left">
        {transactions?.length > 0 ? (
          <div className="card-body">
            <div className="card-body-outside">
              <div className="card-body-container">
                {transactions?.map((item) => {
                  return <TableItemTransactions key={`txs-${item?.h}`} dataItem={item} />
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="table-loading">
            <Spin />
          </div>
        )}
      </div>
    </div>
  )
}

export default TableTransactions
