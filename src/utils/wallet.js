// Set of helper functions to facilitate wallet setup

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (chainId, externalProvider, addToMetamask) => {
  const provider = externalProvider || window.ethereum
  // if (chainId !== siteConfig.chainId) {
  //   console.error('Invalid chain id')
  //   return false
  // }
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      return true
    } catch (switchError) {
      if (switchError?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: addToMetamask,
          })
          return true
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error)
          return false
        }
      }
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const BAD_SRCS = {}
export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals, tokenLogo) => {
  // better leave this undefined for default image instead of broken image url
  // eslint-disable-next-line no-nested-ternary
  const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined

  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image,
      },
    },
  })

  return tokenAdded
}

export const canRegisterToken = () => typeof window !== 'undefined' && window?.ethereum?.isMetaMask
