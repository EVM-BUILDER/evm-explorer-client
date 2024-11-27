import { initPaginationWithData } from 'redux/constants'
import * as actions from './actions'

/**
 * Type data
 * undefined as Fetch data for loading init
 * null as Done Fetch data but error
 */

const initState = {
    holders: {},
    txsErc20: {},
    balancesErc20: {},
    balancesErc721: {},
    allTxnsErc20: {},
}

export default function tokenReducer(state = initState, action) {
    const { params, data } = action
    switch (action.type) {
        // Holders
        case actions.GET_HOLDERS_BY_TOKEN:
            return {
                ...state,
                holders: {
                    ...state.holders,
                    [params.tokenAddress]: {
                        ...(state.holders[params.tokenAddress] || {}),
                        loading: true,
                    },
                },
            }
        case actions.GET_HOLDERS_BY_TOKEN_SUCCESS:
            return {
                ...state,
                holders: {
                    ...state.holders,
                    [params.tokenAddress]: {
                        ...data,
                        loading: false,
                    },
                },
            }

        // Internal txs
        case actions.GET_TXS_ERC20:
            return {
                ...state,
                txsErc20: {
                    ...state.txsErc20,
                    [params.ca]: {
                        ...(state.txsErc20[params.ca] || {}),
                        loading: true,
                    },
                    [params.a]: {
                        ...(state.txsErc20[params.a] || {}),
                        loading: true,
                    },
                },
            }
        case actions.GET_TXS_ERC20_SUCCESS:
            console.log('data', data, 'params', params)
            return {
                ...state,
                txsErc20: {
                    ...state.txsErc20,
                    [params.a]: {
                        ...data,
                        loading: false,
                    },
                    [params.ca]: {
                        ...data,
                        loading: false,
                    },
                },
            }

        // All txs erc20
        case actions.GET_ALL_TXS_ERC20:
            return {
                ...state,
                allTxnsErc20: {
                    ...state.allTxnsErc20,
                    loading: true,
                },
            }
        case actions.GET_ALL_TXS_ERC20_SUCCESS:
            return {
                ...state,
                allTxnsErc20: {
                    ...state.allTxnsErc20,
                    ...data,
                    loading: false,
                },
            }

        // All Erc20 Balances
        case actions.GET_ALL_ERC20_BALANCES_BY_TOKEN:
            const currentDataErc20 = state.balancesErc20[params.address] || {}
            return {
                ...state,
                balancesErc20: {
                    ...state.balancesErc20,
                    [params.address]: {
                        ...currentDataErc20,
                        loading: true,
                    },
                },
            }
        case actions.GET_ALL_ERC20_BALANCES_BY_TOKEN_SUCCESS:
            return {
                ...state,
                balancesErc20: {
                    ...state.balancesErc20,
                    [params.address]: {
                        ...data,
                        loading: false,
                    },
                },
            }

        // All Erc721 Balances
        case actions.GET_ALL_ERC721_BALANCES_BY_TOKEN:
            const currentData721 = state.balancesErc721[params.address] || {}
            return {
                ...state,
                balancesErc721: {
                    ...state.balancesErc721,
                    [params.address]: {
                        ...currentData721,
                        loading: true,
                    },
                },
            }
        case actions.GET_ALL_ERC721_BALANCES_BY_TOKEN_SUCCESS:
            return {
                ...state,
                balancesErc721: {
                    ...state.balancesErc721,
                    [params.address]: {
                        ...data,
                        loading: false,
                    },
                },
            }
        default:
            return state
    }
}
