import React, { useState } from 'react'
import { DownloadOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'

import { message, Input, Menu, Dropdown, Button, Space, Tabs, Row, Col, Table, Modal } from 'antd'

import TableEvent from 'components/TableEvent'
import { Link } from 'components/Link'

const Events = () => {
  return (
    <div className="accounts_erc20token_txs">
      <div className="main-under-card-content">
        <div className="card-content-text-event">
          <div>
            <div>
              <MenuUnfoldOutlined />
              <span>Latest 0 Contract Events</span>
            </div>
            <span className="card-content-text-event-text-span">
              Tip: <Link href="#">Logs</Link> are used by developers/external UI providers for keeping track of contract actions
              and for auditing
            </span>
          </div>
          <div className="card-content-right card-content-right-event">
            <Dropdown
              overlay={
                <div className="modal-search-event">
                  <Input.Search placeholder="Filtered by BlockNo Or Topic0" allowClear enterButton="Find" size="large" />
                </div>
              }
              trigger={['click']}
            >
              <Link href="#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <SearchOutlined />
              </Link>
            </Dropdown>
          </div>
        </div>
        <div className="card-content-table">
          <TableEvent />
        </div>
        <div className="card-content-footer">
          <div className="content-footer-text">
            <span className="content-footer-text-right">
              [ Download
              <Link href="#">CSV Export</Link>
              &nbsp;
              <span>
                <DownloadOutlined />
              </span>
              ]
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
