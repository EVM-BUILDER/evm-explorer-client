import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import ScriptForm from './components/ScriptForm'
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
  },
  {
    link: "/admin/settings/script",
    title: "Script",
    isCurrent: true,
  }
]

const SettingsScript = () => {
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
          <Panel header="Script" key="1">
            <ScriptForm settings={adminSettings} data={adminSettings?.script || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SettingsScript.Layout = AdminLayout

export default SettingsScript
