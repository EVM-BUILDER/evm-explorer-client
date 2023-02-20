import * as actions from './actions'

const initState = {
    nativePrice: {},
    statistics: [],
    page: 1,
    page_size: 25,
    result: 1,
    total: 1,
    topTransactions: [],
    topTokens: [],
    topNetworks: [],
}

export default function statisticsReducer(state = initState, action) {
    const { params, data, error } = action
    switch (action.type) {
        case actions.GET_NATIVE_TOTAL_SUPPLY:
            return {
                ...state,
                totalSupply: data,
            }
        case actions.GET_STATISTICS_SUCCESS:
            return {
                ...state,
                statistics: action.payload?.data || [],
                page: action.payload?.page || 1,
                page_size: action.payload?.page_size || 25,
                result: action.payload?.result || 0,
                total: action.payload?.total || 0,
            }
        case actions.GET_STATISTICS_FAILURE:
            return {
                ...state,
                statistics: [],
            }

        case actions.GET_PULSE_PRICE_SUCCESS:
            const statisticsFirstItem = data?.data?.[0]
            const statisticSecondItem = data?.data?.[1]

            let price = statisticsFirstItem?.tp?.cur
            let oldPrice = statisticSecondItem?.tp?.cur
            let perChange = statisticsFirstItem?.tp?.dif?.toFixed(2)
            let isUp = price >= oldPrice
            let gasPrice = (statisticsFirstItem?.gp?.cur / 1e9 || 0).toFixed(2)
            let gasPriceUsd = ((statisticsFirstItem?.gp?.cur / 1e18) * statisticsFirstItem?.tp?.cur).toFixed(2)

            return {
                ...state,
                nativePrice: {
                    price,
                    oldPrice,
                    perChange,
                    isUp,
                    gasPrice,
                    gasPriceUsd,
                },
            }

        case actions.GET_TOP_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                topTransactions: data,
            }
        case actions.GET_TOP_TOKENS_SUCCESS:
            return {
                ...state,
                topTokens: data,
            }
        case actions.GET_TOP_NETWORKS_SUCCESS:
            return {
                ...state,
                topNetworks: data,
            }
        default:
            return state
    }
}
