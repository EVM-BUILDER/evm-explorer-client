import React from 'react'
import { Dropdown } from 'antd'

const DropdownBase = ({ overlay, children, ...props }) => {
  return (
    <Dropdown overlayClassName="dropdown_base_content" overlay={overlay} arrow={{ pointAtCenter: true }} {...props}>
      {children}
    </Dropdown>
  )
}

export default DropdownBase
