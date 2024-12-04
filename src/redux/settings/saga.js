import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getAdminSettingFromApi() {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/admin/setting/get`, {
            method: 'GET',
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}

function* getAdminSettingRequest() {
    try {
        const { status, data } = yield call(getAdminSettingFromApi)
        if (status === 200) {
            let settings = Object.entries(data.data).reduce((memo, [_, item]) => {
                memo[item.key] = item?.value
                return memo
            }, {})
            yield put(actions.getAdminSettingsSuccess(settings))
        } else {
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    } catch (error) {
        yield put(actions.getAdminSettingsSuccess(null))
    }
}

function updateSettingsFromApi(payload) {
    return fetchHelper
        .fetch(
            `${siteConfig.apiUrl}/admin/setting/set`,
            {
                method: 'POST',
                body: JSON.stringify(payload),
            },
            {
                isToastSuccess: true,
                isToastFailed: true,
            },
        )
        .then(([resp, status]) => ({
            data: resp,
            status,
        }))
}
function* updateSettings({ payload }) {
    try {
        const { status } = yield call(updateSettingsFromApi, payload)
        if (status === 200) {
            yield put(actions.setSettingsSuccess(payload))
        }
    } catch (error) {}
}

function getListGoogleFontFromApi() {
    return fetchHelper
        .fetch(`/api/google-font`, {
            method: 'GET',
        })
        .then(([resp, status]) => ({
            data: resp,
            status,
        }))
}
function* getListGoogleFont() {
    try {
        const { data, status } = yield call(getListGoogleFontFromApi)
        if (status === 200) {
            yield put(actions.getListGoogleFontSuccess(data))
        }
    } catch (error) {}
}

function getResourceFromApi() {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/admin/get-resource`, {
            method: 'GET',
        })
        .then(([resp, status]) => ({
            data: resp,
            status,
        }))
}
function* getResource() {
    try {
        const { data, status } = yield call(getResourceFromApi)
        if (status === 200) {
            yield put(actions.getResourceSuccess(data))
        }
    } catch (error) {}
}

export default function* statisticSaga() {
    yield all([
        takeLatest(actions.SET_SETTINGS, updateSettings),
        takeLatest(actions.GET_LIST_GOOLE_FONT, getListGoogleFont),
        takeLatest(actions.GET_ADMIN_SETTINGS, getAdminSettingRequest),
        takeLatest(actions.GET_RESOURCE, getResource),
    ])
}
