import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import AppearanceForm from './components/AppearanceForm'
import { useDispatch, useSelector } from 'react-redux'
import { getListGoogleFont, getSettings } from 'redux/settings/actions'
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
    link: "/admin/settings/appearance",
    title: "Appearance",
    isCurrent: true,
  }
]

const SettingsAppearance = () => {
  const dispatch = useDispatch()

  const { settings, listGoogleFont } = useSelector((state) => state.Settings)

  const listOptionsFont = listGoogleFont?.items?.map((item) => ({
    value: item?.family,
    label: item?.family,
  })) || []

  useEffect(() => {
    dispatch(getSettings())
    dispatch(getListGoogleFont())
  }, [dispatch])

  return (
    <>
      <Breadcrumb listItems={breadcrumb} />
      <Space direction="vertical" className="admin-setting-wrapper">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Appearance" key="1">
            <AppearanceForm settings={settings} data={settings?.appearance || {}} listOptionsFont={listOptionsFont} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SettingsAppearance.Layout = AdminLayout

export default SettingsAppearance
