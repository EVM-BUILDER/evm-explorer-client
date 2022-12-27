import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { Link } from 'components/Link'
import MenuCollapseIcon from 'widgets/MenuCollapseIcon'
import Account from '../Account'

const Header = ({ showMenu, toggleMenu }) => {
  const router = useRouter()

  const { settings } = useSelector((state) => state.Settings)

  return (
    <header className="nav-admin">
      <div className="nav-content">
        <div className="nav-top">
          <div className="nav-top-content">
            <div className="nav-top-left">
              <MenuCollapseIcon className="menu-collapse" showMenu={showMenu} toggleMenu={toggleMenu} />
              <Link href="/" className="nav-logo">
                {settings?.logo && <img src={settings?.logo} alt="" />}
              </Link>
            </div>
            <div className="nav-top-right">
              <div className="nav-link">
                <div className="nav-account">
                  <Account top="28px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
