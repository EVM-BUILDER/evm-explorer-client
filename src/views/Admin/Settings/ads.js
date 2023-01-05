import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import AdsBannerForm from './components/AdsBannerForm'
import AdsSearchBannerForm from './components/AdsSearchBannerForm'
import AdsTextForm from './components/AdsTextForm'
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
    link: "/admin/settings/ads",
    title: "Ads",
    isCurrent: true,
  }
]

const SettingsAds = () => {
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
          <Panel header="Ads Banner" key="1">
            <AdsBannerForm settings={adminSettings} dataAds={adminSettings?.ads_banner || {}} />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Ads Search Banner" key="1">
            <AdsSearchBannerForm settings={adminSettings} dataAds={adminSettings?.ads_search_banner || {}} />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Ads Text" key="1">
            <AdsTextForm settings={adminSettings} dataAds={adminSettings?.ads_text || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SettingsAds.Layout = AdminLayout

export default SettingsAds
