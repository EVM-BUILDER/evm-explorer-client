import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import ChainForm from './components/ChainForm'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings } from 'redux/settings/actions'
import Breadcrumb from 'components/Breadcrumb'

const { Panel } = Collapse

const breadcrumb = [
  {
    link: "/admin",
    title: "Dashboard"
  },
  {
    link: "/admin/settings/general",
    title: "Settings",
    isCurrent: true,
  },
  {
    link: "/admin/settings/chain",
    title: "Chain",
    isCurrent: true,
  }
]

const SettingsChain = () => {
  const dispatch = useDispatch()

  const { settings } = useSelector((state) => state.Settings)

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  return (
    <>
      <Breadcrumb listItems={breadcrumb} />
      <Space direction="vertical" className="admin-setting-wrapper">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Chain" key="1">
            <ChainForm settings={settings} data={settings?.chain || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SettingsChain.Layout = AdminLayout

export default SettingsChain
