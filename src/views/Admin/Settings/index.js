import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import GlobalForm from './components/GlobalForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSettings } from 'redux/settings/actions'
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
  }
]

const Settings = () => {
  const dispatch = useDispatch()

  const { adminSettings } = useSelector((state) => state.Settings)

  useEffect(() => {
    dispatch(getAdminSettings())
  }, [dispatch])

  return (
    <>
      <Breadcrumb listItems={breadcrumb} />
      <Space direction="vertical" className="admin-setting-wrapper">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Global Settings" key="1">
            <GlobalForm settings={adminSettings} data={adminSettings} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

Settings.Layout = AdminLayout

export default Settings
