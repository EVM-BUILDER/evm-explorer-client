import React from 'react'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const { Option } = Select

const Input = ({ onSelect, ...props }) => {
  return (
    <div className="wrap-input">
      <span>
        <Select labelInValue defaultValue={{ value: 'All Filters' }} style={{ width: 120 }} onChange={onSelect}>
          {/* <Option>All Filters</Option> */}
          <Option value="1">Address</Option>
          <Option value="2">Txn</Option>
          {/* <Option value="2">Tokens</Option> */}
          {/* <Option value="3">Name Tags</Option> */}
          {/* <Option value="4">Labels</Option> */}
          {/* <Option value="5">Websites</Option> */}
        </Select>
      </span>
      <input type="text" placeholder="Search by Address / Txn Hash / Block / Token" {...props} />
      <div type="button" className="form-button">
        <SearchOutlined className="form-button-icon" style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }} />
      </div>
    </div>
  )
}
Input.defaultProps = {
  onSelect: () => null,
}
export default Input
