const actions = {
  SET_ACCOUNT: 'SET_ACCOUNT',
  GET_TOP_ACCOUNT: 'GET_TOP_ACCOUNT',
  GET_TOP_ACCOUNT_START: 'GET_TOP_ACCOUNT_START',
  GET_TOP_ACCOUNT_SUCCESS: 'GET_TOP_ACCOUNT_SUCCESS',
  GET_TOP_ACCOUNT_FAILURE: 'GET_TOP_ACCOUNT_FAILURE',

  GET_LATEST_ACCOUNT_START: 'GET_LATEST_ACCOUNT_START',
  GET_LATEST_ACCOUNT_SUCCESS: 'GET_LATEST_ACCOUNT_SUCCESS',
  GET_LATEST_ACCOUNT_FAILURE: 'GET_LATEST_ACCOUNT_FAILURE',

  GET_LIST_ADDRESS_VERIFY: 'GET_LIST_ADDRESS_VERIFY',
  GET_LIST_ADDRESS_VERIFY_SUCCESS: 'GET_LIST_ADDRESS_VERIFY_SUCCESS',
  GET_LIST_ADDRESS_VERIFY_ERROR: 'GET_LIST_ADDRESS_VERIFY_ERROR',

  getTopAccounts: (params) => ({
    type: actions.GET_TOP_ACCOUNT,
    params,
  }),
  getTopAccountsSuccess: (params, data, error) => ({
    type: actions.GET_TOP_ACCOUNT_SUCCESS,
    params,
    data,
    error,
  }),

  getLatestAccount: (params) => ({
    type: actions.GET_LATEST_ACCOUNT_START,
    payload: { params },
  }),
  getLatestAccountSuccess: (data) => ({
    type: actions.GET_LATEST_ACCOUNT_SUCCESS,
    payload: data,
  }),
  getLatestAccountFailure: (error) => ({
    type: actions.GET_LATEST_ACCOUNT_FAILURE,
    payload: error,
  }),
  getListAddressVerify: (payload) => ({
    type: actions.GET_LIST_ADDRESS_VERIFY,
    payload,
  }),
  getListVerifyAddressSuccess: (payload) => ({
    type: actions.GET_LIST_ADDRESS_VERIFY_SUCCESS,
    payload,
  }),
  getListVerifyAddressError: (payload) => ({
    type: actions.GET_LIST_ADDRESS_VERIFY_ERROR,
    payload,
  }),

  // Submit info address
  SUBMIT_INFO_TOKEN: 'SUBMIT_INFO_TOKEN',
  submitInfoToken: (payload, cbs, cbe) => ({
    type: actions.SUBMIT_INFO_TOKEN,
    payload,
    cbs,
    cbe,
  }),
}

export const {
  getTopAccounts,
  getTopAccountsSuccess,
  getTopAccountsFailure,
  getLatestAccount,
  getLatestAccountSuccess,
  getLatestAccountFailure,
  getListAddressVerify,
  submitInfoToken,
} = actions
export default actions
