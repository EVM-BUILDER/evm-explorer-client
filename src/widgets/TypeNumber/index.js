import React, { useState } from 'react'
import { Menu, Dropdown, Button, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Link from 'components/Link/Link'

const TypeNumber = ({ mapkey, dataItem }) => {
  const [activeKey, setActiveKey] = React.useState('Hex')
  return (
    <li className="typeNumber-li" key={mapkey}>
      <Space wrap>
        <Dropdown
          overlay={
            <Menu activeKey={activeKey}>
              <Menu.Item key="Hex" onClick={() => setActiveKey('Hex')}>
                <a>Hex</a>
              </Menu.Item>
              <Menu.Item key="Number" onClick={() => setActiveKey('Number')}>
                <a>Number</a>
              </Menu.Item>
              <Menu.Item key="Text" onClick={() => setActiveKey('Text')}>
                <a>Text</a>
              </Menu.Item>
              <Menu.Item key="Address" onClick={() => setActiveKey('Address')}>
                <a>Address</a>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button>
            {activeKey}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
      <span>
        → {dataItem}
        {/* {web3.eth.abi.decodeParameter('uint256', activeKey)} */}
      </span>
    </li>
  )
}

export default TypeNumber
