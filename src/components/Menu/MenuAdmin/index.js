import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

import Header from './Header'
import Link from 'components/Link/Link'

const { Sider } = Layout;

const siderbarMenu = [
  {
    key: '/admin',
    icon: <HomeOutlined />,
    label: <Link href={`/admin`}>Dashboard</Link>,
  },
  {
    key: '/admin/settings',
    icon: <SettingOutlined />,
    label: <Link href={`/admin/settings`}>Settings</Link>,
  }
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
      <Layout className='layout-content'>
        <Sider width={200} className={`sidebar-admin ${showMenu ? 'show-sidebar' : 'hide-sidebar'}`}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[router?.pathname || 'dashboard']}
            defaultOpenKeys={[router?.pathname || 'dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            items={siderbarMenu}
          />
        </Sider>
        <Layout style={{ padding: '30px 24px' }}>
          {children}
        </Layout>
      </Layout>
    </>
  )
}

export default MenuAdmin
