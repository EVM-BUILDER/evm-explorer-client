import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import ChainForm from './components/ChainForm'
import GlobalForm from './components/GlobalForm'
import SystemForm from './components/SystemForm'
import ScriptForm from './components/ScriptForm'
import AppearanceForm from './components/AppearanceForm'
import AdsBannerForm from './components/AdsBannerForm'
import AdsSearchBannerForm from './components/AdsSearchBannerForm'
import AdsTextForm from './components/AdsTextForm'
import MenuList from './components/MenuList'
import { useDispatch, useSelector } from 'react-redux'
import { getListGoogleFont, getSettings } from 'redux/settings/actions'
import Breadcrumb from 'components/Breadcrumb'
import FooterForm from './components/FooterForm'

const { Panel } = Collapse

const breadcrumb = [
  {
    link: "/admin",
    title: "Dashboard"
  },
  {
    link: "/admin/settings",
    title: "Settings",
    isCurrent: true,
  }
]

const Settings = () => {
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
        <Collapse>
          <Panel header="Global Settings" key="1">
            <GlobalForm settings={settings} data={settings} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Appearance" key="1">
            <AppearanceForm settings={settings} data={settings?.appearance || {}} listOptionsFont={listOptionsFont} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="System Settings" key="1">
            <SystemForm settings={settings} data={settings?.system || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Chain" key="1">
            <ChainForm settings={settings} data={settings?.chain || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Script" key="1">
            <ScriptForm settings={settings} data={settings?.script || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Ads Banner" key="1">
            <AdsBannerForm settings={settings} dataAds={settings?.ads_banner || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Ads Search Banner" key="1">
            <AdsSearchBannerForm settings={settings} dataAds={settings?.ads_search_banner || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Ads Text" key="1">
            <AdsTextForm settings={settings} dataAds={settings?.ads_text || {}} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Menu Header" key="1">
            <MenuList settings={settings} menuName="menu_header" listMenuItems={settings?.menu_header || []} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Menu Sub Header" key="1">
            <MenuList settings={settings} menuName="menu_sub_header" listMenuItems={settings?.menu_sub_header || []} />
          </Panel>
        </Collapse>
        <Collapse>
          <Panel header="Menu Footer" key="1">
            <FooterForm settings={settings} data={settings?.menu_footer || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

Settings.Layout = AdminLayout

export default Settings
