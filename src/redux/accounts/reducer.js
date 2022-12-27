import actions from './actions'

const initState = {
  topAccounts: {
    data: [],
    loading: true,
  },
  latestAccount: {},
  page: 1,
  page_size: 25,
  total: 0,
}

export default function accountsReducer(state = initState, action) {
  const { params, data, error } = action
  switch (action.type) {
    case actions.GET_TOP_ACCOUNT:
      return {
        ...state,
        topAccounts: {
          ...state.topAccounts,
          params,
          loading: true,
        },
      }
    case actions.GET_TOP_ACCOUNT_SUCCESS:
      return {
        ...state,
        topAccounts: {
          ...(data || {}),
          error,
          loading: false,
        },
      }

    case actions.GET_LATEST_ACCOUNT_SUCCESS:
      return {
        ...state,
        latestAccount: action.payload,
      }
    case actions.GET_LATEST_ACCOUNT_FAILURE:
      return {
        ...state,
        latestAccount: {},
      }
    default:
      return state
  }
}
