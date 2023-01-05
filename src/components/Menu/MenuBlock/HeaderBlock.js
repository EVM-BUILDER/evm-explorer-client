import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import Link from 'components/Link/Link'
import SearchInput from 'components/SearchInput'
import MenuCollapseIcon from 'widgets/MenuCollapseIcon'
import { useSettings } from 'redux/settings/hooks'
import { getActiveMenuItem, getActiveSubMenuItem } from '../utils'
import config from '../config'
import ContentMobile from '../ContentMobile/ContentMobile'
import Account from '../Account'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'

const HeaderBlock = ({ showMenu, toggleMenu }) => {
  const router = useRouter()

  const { nativePrice } = useSelector((state) => state.Statistics)

  const settings = useSettings()

  const menuHeader = settings?.menu_header
  const nativeToken = settings?.chain?.native

  const menuConfig = menuHeader || config()
  const activeMenuItem = getActiveMenuItem({ menuConfig, pathname: router.pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname: router.pathname })

  return (
    <header className="nav-block">
      <div className="nav-content">
        <div className="nav-top">
          <div className="nav-top-content container">
            <div className="nav-top-left">
              <Link href="/" className="nav-logo">
                {settings?.logo && <img src={settings?.logo} alt="" />}
              </Link>
            </div>
            <div className="nav-top-right">
              <MenuCollapseIcon className="menu-collapse" showMenu={showMenu} toggleMenu={toggleMenu} />
              <div className="nav-search-input">
                <SearchInput />
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bottom container">
          <div className="nav-bottom-left">
            {
              <FormatAmount
                prefix={`${nativeToken?.symbol || ''}: $`}
                value={roundNumber(nativePrice?.price, { scale: 5 })}
                nullValue="--"
              />
            }
            (
            {nativePrice?.isUp ? (
              <span className="text-success">{nativePrice?.perChange || 0}%</span>
            ) : (
              <span className="text-warning">{nativePrice?.perChange || 0}%</span>
            )}
            )
            <img src="/images/icon/gas.svg" alt="" /> {nativePrice?.gasPrice || 0} Gwei
          </div>
          <div className="nav-bottom-right">
            <ul className="nav-ul">
              {menuConfig.map((entry, index) => {
                const isActive = activeMenuItem?.title === entry.title
                if (entry.child.length > 0) {
                  return (
                    <li key={`${entry.title}-${index}`}>
                      <Link className={`nav-item ${isActive ? 'nav-item-active' : ''}`} href={entry.url}>
                        {entry.title}
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                          </svg>
                        </span>
                      </Link>
                      <ul className="subnav fadeIn">
                        {entry.child.map((subMenu, subIndex) => {
                          const isSubItemActive = activeSubMenuItem?.url === subMenu.url
                          return (
                            <React.Fragment key={`${subMenu.title}-${subIndex}`}>
                              <li className={`subnav-item ${isSubItemActive ? 'subnav-item-active' : ''}`}>
                                <Link href={subMenu.url} className="subnav-item-label" {...subMenu}>
                                  {subMenu.title}
                                </Link>
                              </li>
                              {subMenu.showBorder && <li className="dropdown-divider" />}
                            </React.Fragment>
                          )
                        })}
                      </ul>
                    </li>
                  )
                }
                return (
                  <li key={`${entry.title}-${index}`}>
                    <Link href={entry.url} className={router.pathname === entry.url ? 'active' : ''} {...entry}>
                      {entry.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="nav-account">
              <Account top="14px" />
            </div>
          </div>
        </div>
        {showMenu && (
          <ContentMobile
            links={menuConfig}
            activeItem={activeMenuItem}
            activeSubItem={activeSubMenuItem}
            toggleMenu={toggleMenu}
          />
        )}
        <div className="nav-search-input-mobile container">
          <SearchInput isContrast />
        </div>
      </div>
    </header>
  )
}

export default HeaderBlock
