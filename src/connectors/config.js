import { MetamaskIcon, TrustWalletIcon } from 'widgets/Svg'
import { ConnectorNames } from 'connectors'

export const connectorsList = (appUrl) => [
  {
    title: 'Metamask',
    icon: MetamaskIcon,
    installed: typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask),
    connectorId: ConnectorNames.Injected,
    priority: 1,
    href: `https://metamask.app.link/dapp/${appUrl.slice(8)}/`,
  },
  {
    title: 'Trust Wallet',
    icon: TrustWalletIcon,
    connectorId: ConnectorNames.Injected,
    installed:
      typeof window !== 'undefined' &&
      (Boolean(window.ethereum?.isTrust) ||
        // @ts-ignore
        Boolean(window.ethereum?.isTrustWallet)),
    priority: 4,
    href: `https://link.trustwallet.com/open_url?coin_id=20000714&url=https://${appUrl.slice(8)}/`,
    downloadLink: {
      desktop: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
    },
  },
]
