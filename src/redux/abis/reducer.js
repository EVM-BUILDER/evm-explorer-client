import * as actions from './actions'

const initState = {
  abis: [],
  abiDetail: {},
  page: 1,
  page_size: 25,
  total: 0,
}

export default function AbisReducer(state = initState, action) {
  const { params, data } = action
  switch (action.type) {
    case actions.GET_ABIS_START:
      return {
        ...state,
        abis: [],
        loading: true,
      }
    case actions.GET_ABIS_SUCCESS:
      return {
        ...state,
        abis: action.payload?.data,
        page: action.payload?.page || 1,
        page_size: action.payload?.page_size || 25,
        total: action.payload?.total || 25,
        loading: false,
      }
    case actions.GET_ABIS_FAILURE:
      return {
        ...state,
        abis: [],
        loading: false,
      }

    default:
      return state
  }
}
