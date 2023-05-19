import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

/* Get holder by token */
function verifyContractFromApi(payload) {
    const formData = new FormData()
    formData.append('address', payload.address)
    formData.append('solc_version', payload.solc_version)
    formData.append('sources', payload.sources)
    formData.append('optimize', payload.optimize)
    fetchHelper.removeDefaultHeader('Content-Type')
    const response = fetchHelper
        .fetch(`${siteConfig.apiUrl}/auth/contract/submit`, {
            method: 'POST',
            body: formData,
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
    fetchHelper.addDefaultHeader('Content-Type', 'application/json')
    return response
}
function* verifyContract({ params, cbs, cbe }) {
    try {
        const { status, data } = yield call(verifyContractFromApi, params)
        if (status === 200) {
            yield put(actions.verifyContractSuccess(params, data.data))
            cbs?.(data.data)
        } else {
            yield put(actions.verifyContractSuccess(params, null, data))
            cbe?.(data)
        }
    } catch (error) {
        console.error('verifyContract', error)
        yield put(actions.verifyContractSuccess(params, null, error))
        cbe?.(error)
    }
}

function getListContractsVerifiedFromApi(params) {
    const str = qs.stringify(params || {})

    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/contract/verified?${str}`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getListContractsVerifiedRequest({ params }) {
    try {
        const { status, data } = yield call(getListContractsVerifiedFromApi, params)
        if (status === 200) {
            yield put(actions.getListContractsVerifiedSuccess(data))
        }
    } catch (error) {
        yield put(actions.getListContractsVerifiedSuccess(null))
    }
}

function getListContractsVerifyFromApi(params) {
    const str = qs.stringify(params || {})
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

function* getListContractsVerifyRequest({ params }) {
    try {
        const { status, data } = yield call(getListContractsVerifyFromApi, params)
        if (status === 200) {
            yield put(actions.getListContractsVerifiedSuccess(data))
        }
    } catch (error) {
        yield put(actions.getListContractsVerifiedSuccess(null))
    }
}

function updateVerifyAddressFromApi(data) {
    return fetchHelper
        .fetch(
            `${siteConfig.apiUrl}/admin/address/approve`,
            {
                method: 'POST',
                body: JSON.stringify(data),
            },
            {
                isToastSuccess: true,
                isToastFailed: true,
            },
        )
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* acceptVerifyAddressRequest({ address }) {
    try {
        const dataSubmit = {
            address: address,
            type: 'approve',
        }

        yield call(updateVerifyAddressFromApi, dataSubmit)
    } catch (error) {}
}

function* rejectVerifyAddressRequest({ address }) {
    try {
        const dataSubmit = {
            address: address,
            type: 'reject',
        }
        yield call(updateVerifyAddressFromApi, dataSubmit)
    } catch (error) {}
}

export default function* rootSaga() {
    yield all([takeLatest(actions.VERIFY_CONTRACT, verifyContract)])
    yield all([takeLatest(actions.GET_CONTRACTS_VERIFY_START, getListContractsVerifyRequest)])
    yield all([takeLatest(actions.GET_CONTRACTS_VERIFIED_START, getListContractsVerifiedRequest)])
    yield all([takeLatest(actions.ACCEPT_VERIFY_ADDRESS, acceptVerifyAddressRequest)])
    yield all([takeLatest(actions.REJECT_VERIFY_ADDRESS, rejectVerifyAddressRequest)])
}
