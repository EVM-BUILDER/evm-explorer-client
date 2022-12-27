import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { toast } from 'react-toastify'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'

import useActiveWeb3React from './useActiveWeb3React'
import { connectorLocalStorageKey } from 'connectors'
import { useSettings } from 'redux/settings/hooks'
// import { clearUserStates } from 'utils/clearUserStates'

const useWalletAuth = () => {
  const dispatch = useDispatch()
  const { chainId, activate, deactivate, setError } = useActiveWeb3React()
  const { addToMetamask } = useSettings()

  const login = useCallback(
    async (connectorID) => {
      const connectorOrGetConnector = connectorsByName[connectorID]
      const connector =
        typeof connectorOrGetConnector !== 'function' ? connectorsByName[connectorID] : await connectorOrGetConnector()

      if (typeof connector !== 'function' && connector) {
        activate(connector, async (error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error)
            const provider = await connector.getProvider()
            const hasSetup = await setupNetwork(chainId, provider, addToMetamask)
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window?.localStorage?.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              toast.error('Provider Error, No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector
                walletConnector.walletConnectProvider = null
              }
              // toast.error(`Authorization Error, Please authorize to access your account`)
            } else {
              toast.error(error.message)
            }
          }
        })
      } else {
        window?.localStorage?.removeItem(connectorLocalStorageKey)
        toast.error(`Unable to find connector, The connector config is wrong`)
      }
    },
    [activate, setError, chainId, addToMetamask],
  )

  const logout = useCallback(() => {
    deactivate()
    // clearUserStates(dispatch, chainId, true)
  }, [deactivate])

  return { login, logout }
}

export default useWalletAuth
