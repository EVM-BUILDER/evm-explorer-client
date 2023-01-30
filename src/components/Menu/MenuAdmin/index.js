import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu } from 'antd'
import Header from './Header'
import { adminMenu } from './config'

const { Sider, Footer } = Layout

const MenuAdmin = ({ children }) => {
  const router = useRouter()

  const menu = adminMenu()

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
            items={menu}
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
