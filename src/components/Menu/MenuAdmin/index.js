import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd'
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  FontColorsOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  MailOutlined,
} from '@ant-design/icons'

import Header from './Header'
import Link from 'components/Link/Link'

const { Sider, Footer } = Layout

const siderbarMenu = [
  {
    key: '/admin',
    icon: <HomeOutlined />,
    label: <Link href={`/admin`}>Dashboard</Link>,
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: <Link href={`/admin`}>Users</Link>,
  },
  {
    key: '/admin/verifyaddress',
    icon: <FontColorsOutlined />,

    label: <Link href={`/admin/verifyaddress`}>Verify Address</Link>,
  },
  {
    key: '/admin/abilibrary',
    icon: <BookOutlined />,

    label: <Link href={`/admin/abilibrary`}>ABI Library</Link>,
  },
  {
    key: '/admin/communication',
    icon: <UsergroupAddOutlined />,
    label: 'Communication',
    children: [
      {
        key: '/admin/communication/sendmail',
        label: <Link href={`/admin/communication/sendmail`}>Send Mail</Link>,
      },
    ],
  },
  {
    key: '/admin/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
    children: [
      {
        key: '/admin/settings/general',
        label: <Link href={`/admin/settings/general`}>General</Link>,
      },
      {
        key: '/admin/settings/appearance',
        label: <Link href={`/admin/settings/appearance`}>Appearance</Link>,
      },
      {
        key: '/admin/settings/menu',
        label: <Link href={`/admin/settings/menu`}>Menu</Link>,
      },
      {
        key: '/admin/settings/ads',
        label: <Link href={`/admin/settings/ads`}>Ads</Link>,
      },
      {
        key: '/admin/settings/chain',
        label: <Link href={`/admin/settings/chain`}>Chain</Link>,
      },
      {
        key: '/admin/settings/script',
        label: <Link href={`/admin/settings/script`}>Script</Link>,
      },
      {
        key: '/admin/settings/systemsettings',
        label: <Link href={`/admin/settings/systemsettings`}>System Settings</Link>,
      },
    ],
  },
]

const MenuAdmin = ({ children }) => {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    // document.querySelector('body').style.overflow = showMenu ? 'unset' : 'hidden'
    setShowMenu((prev) => !prev)
  }

  return (
    <>
      <Header showMenu={showMenu} toggleMenu={toggleMenu} />
      <Layout className="layout-body">
        <Sider width={200} className={`sidebar-admin ${showMenu ? 'show-sidebar' : 'hide-sidebar'}`}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[router?.pathname || 'dashboard']}
            defaultOpenKeys={[router?.pathname || 'dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={siderbarMenu}
          />
        </Sider>
        <div className="layout-content">
          <Layout style={{ padding: '30px 24px' }}>{children}</Layout>
          <Footer>
            <span>©2022 EVM Builder v0.1.1</span>
          </Footer>
        </div>
      </Layout>
    </>
  )
}

export default MenuAdmin
