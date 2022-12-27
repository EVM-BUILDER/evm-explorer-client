import React from 'react'
import { Dropdown } from 'antd'
import './styles.scss'

const WDropdown = ({ title, overlay, overlayClassName, ...props }) => (
  <Dropdown overlay={overlay} trigger={['click']} overlayClassName="wOverlay" {...props}>
    <div>{title}</div>
  </Dropdown>
)
WDropdown.defaultProps = {
  overlayClassName: '',
}
export default WDropdown
