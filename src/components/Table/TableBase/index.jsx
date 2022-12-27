import React from 'react'
import { Table } from 'antd'
import Pagination from '../Pagination'

const TableBase = ({ pagination, ...props }) => {
  return (
    <div className="table_base">
      <Table pagination={false} rowKey={(record) => record?._id?.$oid} {...props} />
      {pagination && (
        <div className="table_base_pagination">
          <Pagination {...pagination} />
        </div>
      )}
    </div>
  )
}

export default TableBase
