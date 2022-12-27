import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'components/Link/Link'

import { MenuOutlined } from '@ant-design/icons'

const listMenuAccount = [
  {
    name: 'Account',
    items: [
      {
        key: 'overview',
        link: '/account/overview',
        icon: '/images/icon/menu-overview.svg',
        title: 'Account Overview'
      },
      {
        key: 'settings',
        link: '/account/settings',
        icon: '/images/icon/menu-setting.svg',
        title: 'Account Settings'
      },
      {
        key: 'connect',
        link: '/account/connect',
        icon: '/images/icon/menu-connect.svg',
        title: 'PULSESCAN Connect'
      }
    ]
  },
  {
    name: 'Watch List & Notes',
    items: [
      {
        key: 'watch-list',
        link: '/account/watch-list',
        icon: '/images/icon/menu-watch-list.svg',
        title: 'Watch List'
      },
      {
        key: 'private-name-tags',
        link: '/account/private-name-tags',
        icon: '/images/icon/menu-name-tags.svg',
        title: 'Private Name Tags'
      },
      {
        key: 'txn-private-notes',
        link: '/account/txn-private-notes',
        icon: '/images/icon/menu-txn-note.svg',
        title: 'Txn Private Notes'
      }
    ]
  },
  {
    name: 'Other',
    items: [
      {
        key: 'api-keys',
        link: '/account/api-keys',
        icon: '/images/icon/menu-api-keys.svg',
        title: 'API Keys'
      },
      {
        key: 'verified-addresses',
        link: '/account/verified-addresses',
        icon: '/images/icon/menu-verifired-address.svg',
        title: 'Verified Addresses'
      },
      {
        key: 'custom-abis',
        link: '/account/custom-abis',
        icon: '/images/icon/menu-custom-abis.svg',
        title: 'Custom ABIs'
      },
      {
        key: 'token-ignore-list',
        link: '/account/token-ignore-list',
        icon: '/images/icon/menu-token.svg',
        title: 'Token Ignore List'
      }
    ]
  }
]

const AccountSidebar = ({active, ...props}) => {
  const [show, setShow] = useState(false)

  const toggleMenu = () => {
    setShow((show) => !show)
  }

  return (
    <div className="sidebar-wrapper">
      <div className="toogle-menu-wrapper"><button className="show-account-menu" onClick={() => toggleMenu()}><MenuOutlined /></button></div>
      <div className={`sidebar-inner ${show ? "show-menu" : "hide-menu"}`}>
      {listMenuAccount?.map((group, indexGroup) => (
        <div className="group-menu" key={indexGroup}>
         <h2 className="group-title">{group?.name || ""}</h2>
         <ul className="menu-list">
          {group?.items?.map((item, itemIndex) => (
            <li className={`menu-item ${active === item?.key ? "active" : ""}`} key={itemIndex}>
              <Link href={item?.link}>
                <div className="menu-icon"><ReactSVG src={item?.icon} /></div>
                <span>{item?.title}</span>
              </Link>
            </li>
          ))}
          </ul>
          </div>
      ))}
      </div>
    </div>
  )
}

export default AccountSidebar
