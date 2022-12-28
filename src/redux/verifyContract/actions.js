export const VERIFY_CONTRACT = 'VERIFY_CONTRACT'
export const VERIFY_CONTRACT_SUCCESS = 'VERIFY_CONTRACT_SUCCESS'
export const verifyContract = (params, cbs, cbe) => ({
  type: VERIFY_CONTRACT,
  params,
  cbs,
  cbe,
})
export const verifyContractSuccess = (params, data, error) => ({
  type: VERIFY_CONTRACT_SUCCESS,
  params,
  data,
  error,
})

export const GET_CONTRACTS_VERIFIED_START = 'GET_CONTRACTS_VERIFIED_START'
export const GET_CONTRACTS_VERIFIED_SUCCESS = 'GET_CONTRACTS_VERIFIED_SUCCESS'

export const getListContractsVerified = (params) => ({
  type: GET_CONTRACTS_VERIFIED_START,
  params,
})

export const getListContractsVerifiedSuccess = (data) => ({
  type: GET_CONTRACTS_VERIFIED_SUCCESS,
  data,
})
