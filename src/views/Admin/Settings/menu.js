import React, { useEffect } from 'react'
import { Collapse, Space } from 'antd'

import AdminLayout from 'layouts/AdminLayout'
import MenuList from './components/MenuList'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSettings } from 'redux/settings/actions'
import Breadcrumb from 'components/Breadcrumb'
import FooterForm from './components/FooterForm'

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
    link: "/admin/settings/menu",
    title: "Menu",
    isCurrent: true,
  }
]

const SettingsMenu = () => {
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
          <Panel header="Menu Header" key="1">
            <MenuList settings={adminSettings} menuName="menu_header" listMenuItems={adminSettings?.menu_header || []} />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Menu Sub Header" key="1">
            <MenuList settings={adminSettings} menuName="menu_sub_header" listMenuItems={adminSettings?.menu_sub_header || []} />
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Menu Footer" key="1">
            <FooterForm settings={adminSettings} data={adminSettings?.menu_footer || {}} />
          </Panel>
        </Collapse>
      </Space>
    </>
  )
}

SettingsMenu.Layout = AdminLayout

export default SettingsMenu
