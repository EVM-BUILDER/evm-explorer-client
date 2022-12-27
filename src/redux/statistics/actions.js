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
