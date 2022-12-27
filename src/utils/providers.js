import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const rpcProvider = (rpc) => new StaticJsonRpcProvider(rpc)

export function getRpcProvider(rpc) {
  if (!rpc) throw new Error('Rpc is not correct for get Provider')
  return rpcProvider(rpc)
}
