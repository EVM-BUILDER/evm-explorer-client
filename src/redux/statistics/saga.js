import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getNativeTokenSupplyFromApi() {
    return fetchHelper.fetch(`${siteConfig.apiUrl}/total-supply`).then(([data, status]) => ({
        data,
        status,
    }))
}

function* getNativeTotalSupply({ params }) {
    try {
        const { data, status } = yield call(getNativeTokenSupplyFromApi, params)
        if (status === 200) {
            yield put(actions.getNativeTotalSupplySuccess(data))
        }
    } catch (error) {
        console.error('fetch getNativeTotalSupply', error)
    }
}

function getListStatisticsFromApi({ params }) {
    const str = qs.stringify(params || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/statistics?${str}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getListStatisticsRequest({ payload }) {
    try {
        const { status, data } = yield call(getListStatisticsFromApi, payload)
        if (status === 200) {
            console.log('data==========', data)
            yield put(actions.getListStatisticsSuccess(data))
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        yield put(actions.getListStatisticsFailure(error))
    }
}

function* getPulsePrice({ params }) {
    try {
        const { status, data } = yield call(getListStatisticsFromApi, params)
        if (status === 200) {
            yield put(actions.getPulsePriceSuccess({ data }))
            yield put(actions.getListStatisticsSuccess(data))
        } else {
            yield put(actions.getPulsePriceSuccess({ data }))
        }
    } catch (error) {
        yield put(actions.getPulsePriceSuccess({ error }))
    }
}

/* Top Transitions */
function getTopTransactionsFromApi({ params }) {
    const str = qs.stringify(params || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/transaction/top10`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getTopTransactionsRequest({ params }) {
    try {
        const { status, data } = yield call(getTopTransactionsFromApi, params)
        if (status === 200) {
            yield put(actions.getTopTransactionsSuccess(data || []))
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        yield put(actions.getTopTransactionsSuccess([]))
    }
}

/* Top Tokens */
function getTopTokensFromApi({ params }) {
    const str = qs.stringify(params || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/token/top10`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getTopTokensRequest({ params }) {
    try {
        const { status, data } = yield call(getTopTokensFromApi, params)
        if (status === 200) {
            yield put(actions.getTopTokensSuccess(data || []))
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        yield put(actions.getTopTokensSuccess([]))
    }
}

/* Top Network */
function getTopNetworksFromApi({ params }) {
    const str = qs.stringify(params || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/network/top10`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getTopNetworksRequest({ params }) {
    try {
        const { status, data } = yield call(getTopNetworksFromApi, params)
        if (status === 200) {
            yield put(actions.getTopNetworksSuccess(data || []))
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        yield put(actions.getTopNetworksSuccess([]))
    }
}

export default function* statisticSaga() {
    yield all([
        takeLatest(actions.GET_NATIVE_TOTAL_SUPPLY, getNativeTotalSupply),
        takeLatest(actions.GET_STATISTICS_START, getListStatisticsRequest),
        takeLatest(actions.GET_PULSE_PRICE, getPulsePrice),
        takeLatest(actions.GET_TOP_TRANSACTIONS, getTopTransactionsRequest),
        takeLatest(actions.GET_TOP_TOKENS, getTopTokensRequest),
        takeLatest(actions.GET_TOP_NETWORKS, getTopNetworksRequest),
    ])
}
