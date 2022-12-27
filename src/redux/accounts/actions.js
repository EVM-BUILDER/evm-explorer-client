const actions = {
  SET_ACCOUNT: 'SET_ACCOUNT',
  GET_TOP_ACCOUNT: 'GET_TOP_ACCOUNT',
  GET_TOP_ACCOUNT_START: 'GET_TOP_ACCOUNT_START',
  GET_TOP_ACCOUNT_SUCCESS: 'GET_TOP_ACCOUNT_SUCCESS',
  GET_TOP_ACCOUNT_FAILURE: 'GET_TOP_ACCOUNT_FAILURE',

  GET_LATEST_ACCOUNT_START: 'GET_LATEST_ACCOUNT_START',
  GET_LATEST_ACCOUNT_SUCCESS: 'GET_LATEST_ACCOUNT_SUCCESS',
  GET_LATEST_ACCOUNT_FAILURE: 'GET_LATEST_ACCOUNT_FAILURE',

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
}

export const {
  getTopAccounts,
  getTopAccountsSuccess,
  getTopAccountsFailure,
  getLatestAccount,
  getLatestAccountSuccess,
  getLatestAccountFailure,
} = actions

export default actions
