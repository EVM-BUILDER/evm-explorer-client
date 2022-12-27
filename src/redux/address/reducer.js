import * as actions from './actions'

/**
 * Type data
 * undefined as Fetch data for loading init
 * null as Done Fetch data but error
 */

const initState = {
  addressDetail: {
    data: undefined,
  },
  listAddress: {
    data: undefined,
    page: 1,
    page_size: 25,
    total: 0,
  },
}

export default function accountsReducer(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case actions.GET_ADDRESS_DETAIL_SUCCESS:
      const addressDetail = {
        data: payload,
      }
      return {
        ...state,
        addressDetail,
      }

    // All txs erc20
    case actions.GET_LIST_ADDRESS_START:
      return {
        ...state,
        listAddress: {
          ...state.listAddress,
          loading: true,
        },
      }
    case actions.GET_LIST_ADDRESS_SUCCESS:
      return {
        ...state,
        listAddress: {
          ...state.listAddress,
          ...payload,
          loading: false,
        },
      }

    default:
      return state
  }
}
