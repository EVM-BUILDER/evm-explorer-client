import React from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import { connectorLocalStorageKey, walletLocalStorageKey } from 'connectors'

const WalletCard = ({ login, walletConfig }) => {
  const { title, icon: Icon, installed, downloadLink } = walletConfig

  let TagElement = 'div'
  let propsActions = {
    onClick: () => {
      login(walletConfig.connectorId)
      // localStorage?.setItem(walletLocalStorageKey, walletConfig.title)
      // localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId)
    },
  }

  if (installed === false && isDesktop && downloadLink?.desktop) {
    TagElement = 'a'
    propsActions = {
      href: downloadLink.desktop,
      style: {
        textDecoration: 'none',
      },
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }
  if (typeof window !== 'undefined' && !window.ethereum && walletConfig.href && isMobile) {
    TagElement = 'a'
    propsActions = {
      style: {
        textDecoration: 'none',
      },
      href: walletConfig.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  }

  return (
    <TagElement
      role="presentation"
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
      className="wallet-item"
      {...propsActions}
    >
      <span>{title}</span>
      <Icon />
    </TagElement>
  )
}

export default WalletCard
