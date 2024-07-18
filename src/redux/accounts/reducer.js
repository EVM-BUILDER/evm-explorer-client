import actions from './actions'

const initState = {
    topAccounts: {
        data: [],
        params: {},
        loading: true,
    },
    latestAccount: {},
    listAddressVerify: {
        data: [],
        params: {},
        loading: true,
        error: null,
    },
    totalSupply: {},
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

        case actions.GET_LIST_ADDRESS_VERIFY:
            return {
                ...state,
                listAddressVerify: {
                    ...state.listAddressVerify,
                    params: action.payload,
                    loading: true,
                },
            }
        case actions.GET_LIST_ADDRESS_VERIFY_SUCCESS:
            return {
                ...state,
                listAddressVerify: {
                    ...state.listAddressVerify,
                    data: action.payload,
                    // data: [
                    //   {
                    //     _id: {
                    //       $oid: '63b538db29b7e89c97c08e86',
                    //     },
                    //     address: '0x62601aF2B531638E50f2A2432CA27409A78548e0',
                    //     basic_info: 'test',
                    //     other: 'test',
                    //     owner: 'admin',
                    //     request_type: 'test',
                    //     social_profiles: 'test',
                    //     status: 'approved',
                    //     'token-waiting-review': {},
                    //   },
                    // ],
                    loading: false,
                },
            }
        case actions.GET_LIST_ADDRESS_VERIFY_ERROR:
            return {
                ...state,
                listAddressVerify: {
                    ...state.listAddressVerify,
                    data: undefined,
                    loading: false,
                    error: action.payload,
                },
            }
        case actions.GET_TOTAL_SUPPLY_SUCCESS:
            return {
                ...state,
                totalSupply: action.payload,
            }
        default:
            return state
    }
}
