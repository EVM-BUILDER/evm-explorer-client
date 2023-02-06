import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/dist/client/router'
import { Link } from 'components/Link'
import config from '../config'
import ContentMobile from '../ContentMobile/ContentMobile'
import MenuCollapseIcon from 'widgets/MenuCollapseIcon'
import { getActiveMenuItem, getActiveSubMenuItem } from '../utils'
import { UserIcon } from 'widgets/Svg'
import Account from '../Account'

const Header = ({ showMenu, toggleMenu }) => {
    const router = useRouter()

    const { settings } = useSelector((state) => state.Settings)
    const menuHeader = settings?.menu_header

    const menuConfig = menuHeader || config()
    const activeMenuItem = getActiveMenuItem({ menuConfig, pathname: router.pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname: router.pathname })

    return (
        <header className="nav-default">
            <div className="nav-content">
                <div className="nav-top">
                    <div className="nav-top-content container">
                        <div className="nav-top-left">
                            <Link href="/" className="nav-logo">
                                {settings?.logotext && <img src={settings?.logotext} alt="" />}
                            </Link>
                        </div>
                        <div className="nav-top-right">
                            <MenuCollapseIcon className="menu-collapse" showMenu={showMenu} toggleMenu={toggleMenu} />
                            <div className="nav-link">
                                <ul className="nav-ul">
                                    {menuConfig.map((entry, index) => {
                                        if (entry.child?.length > 0) {
                                            return (
                                                <li key={`${entry.title}-${index}`}>
                                                    <Link href={entry.url} className="nav-blockchain">
                                                        {entry.title}
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                                <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                    <div className="submenu fadeIn">
                                                        <ul>
                                                            {entry.child.map((subMenu, subIndex) => (
                                                                <React.Fragment key={`${subMenu.title}-${subIndex}`}>
                                                                    <li>
                                                                        <Link
                                                                            href={subMenu.url}
                                                                            className="navlink-submenu"
                                                                            {...subMenu}
                                                                        >
                                                                            {subMenu.title}
                                                                        </Link>
                                                                    </li>
                                                                    {subMenu.showBorder && <li className="dropdown-divider" />}
                                                                </React.Fragment>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        return (
                                            <li key={`${entry.title}-${index}`}>
                                                <Link
                                                    href={entry.url}
                                                    className={router.pathname === entry.url ? 'active' : ''}
                                                    {...entry}
                                                >
                                                    {entry.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className="nav-account">
                                    <Account top="28px" />

                                    {/* <div className="username">
                    <Link href="/login">Sign In</Link>
                  </div>
                  <div className="avatar">
                    <UserIcon width="24px" height="24px" />
                  </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showMenu && (
                    <ContentMobile
                        showMenu={showMenu}
                        links={menuConfig}
                        activeItem={activeMenuItem}
                        activeSubItem={activeSubMenuItem}
                        toggleMenu={toggleMenu}
                    />
                )}
            </div>
        </header>
    )
}

export default Header
