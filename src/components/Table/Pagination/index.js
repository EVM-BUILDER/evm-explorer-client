import React, { useState } from 'react'
import { Select } from 'antd'

const defaultSizeOptions = [10, 25, 50, 100]

const Pagination = ({
  total = 0,
  page = 1,
  page_size = 25,
  sizeOptions = defaultSizeOptions,
  onChange = () => null,
  onChangeSize = () => {},
  showSizeChange = true,
  showTotal = '',
  props,
}) => {
  const [initPageSize] = useState(page_size)
  const totalPage = total % page_size > 0 ? Math.floor(total / page_size) + 1 : Math.floor(total / page_size)

  const handleChangePagination = (key) => {
    switch (key) {
      case 'first':
        onChange({
          page: 1,
          page_size: initPageSize,
        })
        break
      case 'previous':
        onChange({
          page: page - 1,
          page_size,
        })
        break
      case 'next':
        onChange({
          page: page + 1,
          page_size,
        })
        break
      case 'last':
        onChange({
          page: total % page_size > 0 ? Math.floor(total / page_size) + 1 : Math.floor(total / page_size),
          page_size,
        })
        break
    }
  }

  return (
    <div className="base_pagination" {...props}>
      {showSizeChange && (
        <div className="base_pagination_show-record">
          <span className="base_pagination_show">Show</span>
          <Select
            value={page_size}
            style={{ width: 70 }}
            onChange={(value) => onChangeSize(value)}
            options={sizeOptions.map((size) => ({ label: size, value: size }))}
          />
          <span className="base_pagination_records">Records</span>
        </div>
      )}
      <div
        className={`base_pagination_pagination ${
          showSizeChange ? 'base_pagination_have-show-records' : 'base_pagination_none-show-records'
        }`}
      >
        {showTotal && <div className="base_pagination_total">{showTotal}</div>}
        <button className="item base_pagination_first" disabled={page <= 1} onClick={() => handleChangePagination('first')}>
          First
        </button>
        <button className="item base_pagination_previous" disabled={page <= 1} onClick={() => handleChangePagination('previous')}>
          <span>&#60;</span>
        </button>
        <div className="item base_pagination_number">
          Page {page} of {totalPage}
        </div>
        <button className="item base_pagination_next" disabled={page >= totalPage} onClick={() => handleChangePagination('next')}>
          <span>&#62;</span>
        </button>
        <button className="item base_pagination_last" disabled={page >= totalPage} onClick={() => handleChangePagination('last')}>
          Last
        </button>
      </div>
    </div>
  )
}

export default Pagination
