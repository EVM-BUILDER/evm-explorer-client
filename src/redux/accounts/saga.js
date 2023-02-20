import { all, takeLatest, put, call } from 'redux-saga/effects'
import * as qs from 'query-string'
import fetchHelper from 'library/helpers/FetchHelper'
import siteConfig from 'config/site.config'
import actions from './actions'

/* Get holder by token */
function getTopAccountsFromApi(payload) {
    const str = qs.stringify(payload || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/address?${str}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* getTopAccounts({ params }) {
    try {
        const { status, data } = yield call(getTopAccountsFromApi, params)
        if (status === 200) {
            yield put(actions.getTopAccountsSuccess(params, data))
        } else {
            yield put(actions.getTopAccountsSuccess(params, null, data))
        }
    } catch (error) {
        console.error('getTopAccounts', error)
        yield put(actions.getTopAccountsSuccess(params, null, error))
    }
}
//
function getListVerifyAddressFromApi(payload) {
    const str = qs.stringify(payload || {})
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/auth/address?${str}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* getListAddressVerify({ payload }) {
    try {
        const { status, data } = yield call(getListVerifyAddressFromApi, payload)
        if (status === 200) {
            yield put(actions.getListVerifyAddressSuccess(data.data))
        } else {
            yield put(actions.getListVerifyAddressError(data))
        }
    } catch (error) {
        console.error('getListAddressVerify', error)
        yield put(actions.getListVerifyAddressError(error))
    }
}
//
function submitInfoTokenFromApi(payload) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/auth/address/verify`, {
            method: 'POST',
            body: JSON.stringify(payload),
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* submitInfoToken({ payload, cbs, cbe }) {
    try {
        const { status, data } = yield call(submitInfoTokenFromApi, payload)
        if (status === 200) {
            cbs?.(data.data)
        } else {
            cbe?.(data)
        }
    } catch (error) {
        console.error('submitInfoToken', error)
        cbe?.(error)
    }
}
export default function* rootSaga() {
    yield all([
        takeLatest(actions.GET_TOP_ACCOUNT, getTopAccounts),
        takeLatest(actions.GET_LIST_ADDRESS_VERIFY, getListAddressVerify),
        takeLatest(actions.SUBMIT_INFO_TOKEN, submitInfoToken),
    ])
}
