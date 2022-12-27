import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

// Imports below migrated from Exchange useContract.ts
import { getRpcProvider } from 'utils/providers'
import { getContract, getProviderOrSigner } from '../utils'
import ERC20_ABI from 'config/abis/erc20.json'
import { useSettings } from 'redux/settings/hooks'

// /**
//  * Helper hooks to get specific contracts (by ABI)
//  */
// export const useERC20 = (address, withSignerIfPossible = true) => {
//   const { library, account } = useActiveWeb3React()
//   const signer = useMemo(
//     () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
//     [withSignerIfPossible, library, account],
//   )
//   return useMemo(() => getBep20Contract(address, signer), [address, signer])
// }

// /**
//  * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
//  */
// export const useERC721 = (address, withSignerIfPossible = true) => {
//   const { account, library } = useActiveWeb3React()
//   const signer = useMemo(
//     () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
//     [withSignerIfPossible, library, account],
//   )
//   return useMemo(() => getErc721Contract(address, signer), [address, signer])
// }

// returns null on errors
export function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account, chainId } = useActiveWeb3React()
  const { chain } = useSettings()

  const signer = useMemo(() => {
    const isMainnet = true
    return withSignerIfPossible ? getProviderOrSigner(library, account) : isMainnet ? getRpcProvider(parseInt(chain.id)) : library
  }, [withSignerIfPossible, library, account, chainId])

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible],
  )

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, signer)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, signer, canReturnContract])
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
