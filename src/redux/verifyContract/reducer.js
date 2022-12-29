import * as actions from './actions'

/**
 * Type data
 * undefined as Fetch data for loading init
 * null as Done Fetch data but error
 */

const initState = {
  verifyContract: {},
  contractsVerified: {
    data: [],
    page: 1,
    page_size: 25,
    total: 0,
  },
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

    case actions.GET_CONTRACTS_VERIFIED_START:
      return {
        ...state,
        contractsVerified: {
          ...state.contractsVerified,
          loading: true,
        },
      }
    case actions.GET_CONTRACTS_VERIFIED_SUCCESS:
      console.log(data)
      return {
        ...state,
        contractsVerified: {
          ...state.contractsVerified,
          ...data,
          loading: false,
        },
      }

    default:
      return state
  }
}
