export const SET_STATISTIC = 'SET_STATISTIC'
export const GET_STATISTICS_REQUEST = 'GET_STATISTICS_REQUEST'
export const GET_STATISTICS_START = 'GET_STATISTICS_START'
export const GET_STATISTICS_SUCCESS = 'GET_STATISTICS_SUCCESS'
export const GET_STATISTICS_FAILURE = 'GET_STATISTICS_FAILURE'

export const getListStatistics = (params) => ({
  type: GET_STATISTICS_START,
  payload: { params },
})
export const getListStatisticsSuccess = (data) => ({
  type: GET_STATISTICS_SUCCESS,
  payload: data,
})
export const getListStatisticsFailure = (error) => ({
  type: GET_STATISTICS_FAILURE,
  payload: error,
})

export const GET_PULSE_PRICE = 'GET_PULSE_PRICE'
export const GET_PULSE_PRICE_SUCCESS = 'GET_PULSE_PRICE_SUCCESS'
export const getPulsePrice = (params) => ({
  type: GET_PULSE_PRICE,
  params,
})
export const getPulsePriceSuccess = ({ data }) => ({
  type: GET_PULSE_PRICE_SUCCESS,
  data,
})

export const GET_TOP_TRANSACTIONS = 'GET_TOP_TRANSACTIONS'
export const GET_TOP_TRANSACTIONS_SUCCESS = 'GET_TOP_TRANSACTIONS_SUCCESS'
export const getTopTransactions = (params) => ({
  type: GET_TOP_TRANSACTIONS,
  params,
})
export const getTopTransactionsSuccess = ({ data }) => ({
  type: GET_TOP_TRANSACTIONS_SUCCESS,
  data,
})

export const GET_TOP_NETWORKS = 'GET_TOP_NETWORKS'
export const GET_TOP_NETWORKS_SUCCESS = 'GET_TOP_NETWORKS_SUCCESS'
export const getTopNetworks = (params) => ({
  type: GET_TOP_NETWORKS,
  params,
})
export const getTopNetworksSuccess = ({ data }) => ({
  type: GET_TOP_NETWORKS_SUCCESS,
  data,
})

export const GET_TOP_TOKENS = 'GET_TOP_TOKENS'
export const GET_TOP_TOKENS_SUCCESS = 'GET_TOP_TOKENS_SUCCESS'
export const getTopTokens = (params) => ({
  type: GET_TOP_TOKENS,
  params,
})
export const getTopTokensSuccess = ({ data }) => ({
  type: GET_TOP_TOKENS_SUCCESS,
  data,
})
