import React from 'react'
import { Input } from 'antd'

const InputOverview = ({ placeholder, ...props }) => {
  return <Input placeholder={placeholder} {...props} />
}

export default InputOverview
