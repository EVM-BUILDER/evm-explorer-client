import { Select } from 'antd'
import React from 'react'

const TablePagination = ({ total, page, pageSize, onChange, onChangeShow = () => { }, disableShow = false }) => {

  const totalPage = total % pageSize > 0 ? Math.floor(total / pageSize) + 1 : Math.floor(total / pageSize)

  return (
    <div className="pagination-wrapper">
      {!disableShow && (
        <div className="show-record">
          <span className="show">Show</span>
          <Select
            defaultValue={25}
            style={{ width: 70 }}
            onChange={(value) => onChangeShow(value)}
            options={[
              {
                value: 10,
                label: '10',
              },
              {
                value: 25,
                label: '25',
              },
              {
                value: 50,
                label: '50',
              },
              {
                value: 100,
                label: '100',
              },
            ]}
          />
          <span className="records">Records</span>
        </div>
      )}
      <div className={`pagination ${disableShow ? "none-show-records" : "have-show-records"}`}>
        <button className="pagi-item first" disabled={page <= 1} onClick={() => onChange('first')}>First</button>
        <button className="pagi-item previous" disabled={page <= 1} onClick={() => onChange('previous')}>
          <span>&#60;</span>
        </button>
        <div className="number">Page {page} of {totalPage}</div>
        <button className="pagi-item next" disabled={page >= totalPage} onClick={() => onChange('next')}>
          <span>&#62;</span>
        </button>
        <button className="pagi-item last" disabled={page >= totalPage} onClick={() => onChange('last')}>Last</button>
      </div>
    </div>
  )
}

export default TablePagination
