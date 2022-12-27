export const GET_HOLDERS_BY_TOKEN = 'GET_HOLDERS_BY_TOKEN'
export const GET_HOLDERS_BY_TOKEN_SUCCESS = 'GET_HOLDERS_BY_TOKEN_SUCCESS'
export const getHoldersByToken = (params) => ({
  type: GET_HOLDERS_BY_TOKEN,
  params,
})
export const getHoldersByTokenSuccess = (params, data) => ({
  type: GET_HOLDERS_BY_TOKEN_SUCCESS,
  params,
  data,
})

export const GET_TXS_ERC20 = 'GET_TXS_ERC20'
export const GET_TXS_ERC20_SUCCESS = 'GET_TXS_ERC20_SUCCESS'
export const getTxsErc20 = (params) => ({
  type: GET_TXS_ERC20,
  params,
})
export const getTxsErc20Success = (params, data) => ({
  type: GET_TXS_ERC20_SUCCESS,
  params,
  data,
})

// All Erc20 balance list
export const GET_ALL_ERC20_BALANCES_BY_TOKEN = 'GET_ALL_ERC20_BALANCES_BY_TOKEN'
export const GET_ALL_ERC20_BALANCES_BY_TOKEN_SUCCESS = 'GET_ALL_ERC20_BALANCES_BY_TOKEN_SUCCESS'
export const getAllErc20BalancesByToken = (params) => ({
  type: GET_ALL_ERC20_BALANCES_BY_TOKEN,
  params,
})
export const getAllErc20BalancesByTokenSuccess = (params, data) => ({
  type: GET_ALL_ERC20_BALANCES_BY_TOKEN_SUCCESS,
  params,
  data,
})

// All Erc721 balance list
export const GET_ALL_ERC721_BALANCES_BY_TOKEN = 'GET_ALL_ERC721_BALANCES_BY_TOKEN'
export const GET_ALL_ERC721_BALANCES_BY_TOKEN_SUCCESS = 'GET_ALL_ERC721_BALANCES_BY_TOKEN_SUCCESS'
export const getAllErc721BalancesByToken = (params) => ({
  type: GET_ALL_ERC721_BALANCES_BY_TOKEN,
  params,
})
export const getAllErc721BalancesByTokenSuccess = (params, data) => ({
  type: GET_ALL_ERC721_BALANCES_BY_TOKEN_SUCCESS,
  params,
  data,
})

export const GET_ALL_TXS_ERC20 = 'GET_ALL_TXS_ERC20'
export const GET_ALL_TXS_ERC20_SUCCESS = 'GET_ALL_TXS_ERC20_SUCCESS'
export const getAllTxsErc20 = (params) => ({
  type: GET_ALL_TXS_ERC20,
  params,
})
export const getAllTxsErc20Success = (data) => ({
  type: GET_ALL_TXS_ERC20_SUCCESS,
  data,
})
