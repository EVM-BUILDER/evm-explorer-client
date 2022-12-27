import * as actions from './actions'

/**
 * Type data
 * undefined as Fetch data for loading init
 * null as Done Fetch data but error
 */

const initState = {
  verifyContract: {},
}

export default function verifyContractReducer(state = initState, action) {
  const { params, data } = action
  switch (action.type) {
    // verifyContract
    case actions.VERIFY_CONTRACT:
      return {
        ...state,
        verifyContract: {
          ...state.verifyContract,
          [params.address]: {
            ...(state.verifyContract[params.address] || {}),
            loading: true,
          },
        },
      }
    case actions.VERIFY_CONTRACT_SUCCESS:
      return {
        ...state,
        verifyContract: {
          ...state.verifyContract,
          [params.address]: {
            ...data,
            params,
            loading: false,
          },
        },
      }

    default:
      return state
  }
}
