import * as actions from './actions'

// export const CACHE_TRANSACTION = 'cache:trust:txh'

const initState = {
    transactions: [],
    transactionDetail: {},
    page: 1,
    page_size: 25,
    total: 0,

    // txs by address
    txsByAddress: {},
}

export default function transactionsReducer(state = initState, action) {
    const { params, data } = action
    switch (action.type) {
        case actions.GET_TRANSACTIONS_START:
            return {
                ...state,
                // transactions: [],
                loading: true,
            }
        case actions.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactions: action.payload?.data,
                page: action.payload?.page || 1,
                page_size: action.payload?.page_size || 25,
                total: action.payload?.total || 25,
                loading: false,
            }
        case actions.GET_TRANSACTIONS_FAILURE:
            return {
                ...state,
                transactions: [],
                loading: false,
            }
        case actions.GET_TRANSACTION_DETAIL_START:
            return {
                ...state,
                transactionDetail: {},
                loading: true,
            }
        case actions.GET_TRANSACTION_DETAIL_SUCCESS:
            return {
                ...state,
                transactionDetail: action.payload?.data,
                loading: false,
            }
        case actions.GET_TRANSACTION_DETAIL_FAILURE:
            return {
                ...state,
                transactionDetail: {},
                loading: false,
            }

        // txs by address

        // All Erc721 Balances
        case actions.GET_TXS_BY_ADDRESS:
            const currentData = state.txsByAddress[params.a] || {}
            return {
                ...state,
                txsByAddress: {
                    ...state.txsByAddress,
                    [params.a]: {
                        ...currentData,
                        loading: true,
                    },
                },
            }
        case actions.GET_TXS_BY_ADDRESS_SUCCESS:
            return {
                ...state,
                txsByAddress: {
                    ...state.txsByAddress,
                    [params.a]: {
                        ...data,
                        loading: false,
                    },
                },
            }

        default:
            return state
    }
}
