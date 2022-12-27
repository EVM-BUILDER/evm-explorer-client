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
