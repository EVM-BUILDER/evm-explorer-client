import { returnWithError, returnWithSuccess } from 'utils/returnHelper'

export const requestAddNetworkToWallet = async (addToMetamask) => {
  if (typeof window === undefined) return returnWithError({ message: 'Window is not defined' })
  try {
    const result = await window.ethereum.request({ method: 'wallet_addEthereumChain', params: addToMetamask })
    return returnWithSuccess(result)
  } catch (error) {
    return returnWithError(error)
  }
}
