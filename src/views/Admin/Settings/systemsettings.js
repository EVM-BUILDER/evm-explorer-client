import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import SystemForm from './components/SystemForm'
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
    link: "/admin/settings/systemsettings",
    title: "System Settings",
    isCurrent: true,
  }
]

const SystemSettings = () => {
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
          <Panel header="System Settings" key="1">
            <SystemForm settings={settings} data={settings?.system || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SystemSettings.Layout = AdminLayout

export default SystemSettings
