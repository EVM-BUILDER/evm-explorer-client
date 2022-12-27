import { useWeb3React } from '@web3-react/core'
import { useSettings } from 'redux/settings/hooks'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()
  const settings = useSettings()

  return {
    library: library ?? undefined,
    chainId: chainId || parseInt(settings?.chain?.id || 0),
    ...web3React,
  }
}

export default useActiveWeb3React
