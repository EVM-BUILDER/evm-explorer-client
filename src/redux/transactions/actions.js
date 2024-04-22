export const SET_TRANSACTION = 'SET_TRANSACTION'
export const GET_TRANSACTIONS_REQUEST = 'GET_TRANSACTIONS_REQUEST'
export const GET_TRANSACTIONS_START = 'GET_TRANSACTIONS_START'
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS'
export const GET_TRANSACTIONS_FAILURE = 'GET_TRANSACTIONS_FAILURE'

export const GET_TRANSACTION_DETAIL_START = 'GET_TRANSACTION_DETAIL_START'
export const GET_TRANSACTION_DETAIL_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS'
export const GET_TRANSACTION_DETAIL_FAILURE = 'GET_TRANSACTION_DETAIL_FAILURE'

export const GET_LATEST_TRANSACTION_SUCCESS = 'GET_LATEST_TRANSACTION_SUCCESS'

export const getListTransactions = (params) => ({
    type: GET_TRANSACTIONS_START,
    payload: { params },
})
export const getListTransactionsSuccess = (data) => ({
    type: GET_TRANSACTIONS_SUCCESS,
    payload: data,
})
export const getListTransactionsFailure = (error) => ({
    type: GET_TRANSACTIONS_FAILURE,
    payload: error,
})

export const getTransactionDetail = (txHash) => ({
    type: GET_TRANSACTION_DETAIL_START,
    payload: { txHash },
})
export const getTransactionDetailSuccess = (data) => ({
    type: GET_TRANSACTION_DETAIL_SUCCESS,
    payload: data,
})
export const getTransactionDetailFailure = (error) => ({
    type: GET_TRANSACTION_DETAIL_FAILURE,
    payload: error,
})

// All txs by address
export const GET_TXS_BY_ADDRESS = 'GET_TXS_BY_ADDRESS'
export const GET_TXS_BY_ADDRESS_SUCCESS = 'GET_TXS_BY_ADDRESS_SUCCESS'
export const getTxsByAddress = (params) => ({
    type: GET_TXS_BY_ADDRESS,
    params,
})
export const getTxsByAddressSuccess = (params, data) => ({
    type: GET_TXS_BY_ADDRESS_SUCCESS,
    params,
    data,
})

export const getLatestTransaction = (data) => ({
    type: GET_LATEST_TRANSACTION_SUCCESS,
    payload: data,
})
