import { all, put, takeLatest, call } from 'redux-saga/effects'
import siteConfig from 'config/site.config'
import * as actions from './actions'
import fetchHelper, { responseWidthError, responseWidthSuccess } from 'library/helpers/FetchHelper'
import { isServer } from 'utils/isServer'
import { setAuthToken, clearToken } from 'utils/auth'

/* Register */
function registerRequestFromApi(params) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* registerRequest({ payload, cbs, cbe }) {
    try {
        const response = yield call(registerRequestFromApi, payload)
        responseWidthSuccess(response).then(cbs).catch(cbe)
    } catch (error) {
        responseWidthError({ error }).then(cbe).catch(cbe)
    }
}

/* Login */

/* Get holder by token */
function loginRequestFromApi(params) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(([data, status, error]) => {
            console.log('data', data)
            return {
                data,
                status,
                error,
            }
        })
}
function* loginRequest({ payload, cbs, cbe }) {
    try {
        const { data, status, error } = yield call(loginRequestFromApi, payload)
        if (status === 200) {
            if (data?.token && !isServer) {
                console.log(data?.token, isServer)
                const authToken = setAuthToken(data?.token)
                console.log('authToken', authToken)
                if (authToken) {
                    cbs?.(data)
                }
            } else {
                cbe?.(data)
            }
        } else {
            cbe?.(data)
        }
    } catch (error) {
        cbe?.(data)
    }
}

function* logoutRequest({ cbs, cbe }) {
    try {
        const isClear = clearToken()
        if (isClear) {
            cbs?.()
            yield put(actions.logoutSuccess())
        }
    } catch (error) {
        cbe?.(error)
    }
}

// get otp
function getOTPRequestFromApi(params) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/user/getOTP`, {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* getOTPRequest({ params, cbs, cbe }) {
    try {
        const response = yield call(getOTPRequestFromApi, params)
        responseWidthSuccess(response).then(cbs).catch(cbe)
    } catch (error) {
        responseWidthError({ error }).then(cbe).catch(cbe)
    }
}

// forgot
function forgotRequestFromApi(params) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/user/forget_password`, {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* forgotRequest({ params, cbs, cbe }) {
    try {
        const response = yield call(forgotRequestFromApi, params)
        responseWidthSuccess(response).then(cbs).catch(cbe)
    } catch (error) {
        responseWidthError({ error }).then(cbe).catch(cbe)
    }
}

// forgot
function verifyEmailFromApi(params) {
    return fetchHelper
        .fetch(`${siteConfig.apiUrl}/verify-email`, {
            method: 'POST',
            body: JSON.stringify(params),
        })
        .then(([data, status]) => {
            return {
                data,
                status,
            }
        })
}
function* verifyEmail({ params, cbs, cbe }) {
    try {
        const response = yield call(verifyEmailFromApi, params)
        responseWidthSuccess(response).then(cbs).catch(cbe)
    } catch (error) {
        responseWidthError({ error }).then(cbe).catch(cbe)
    }
}

/* Auth root */
export default function* AuthSaga() {
    yield all([
        takeLatest(actions.REGISTER_REQUEST, registerRequest),
        takeLatest(actions.LOGIN_REQUEST, loginRequest),
        takeLatest(actions.LOGOUT_REQUEST, logoutRequest),
        takeLatest(actions.GET_OTP_REQUEST, getOTPRequest),
        takeLatest(actions.FORGOT_REQUEST, forgotRequest),
        takeLatest(actions.VERIFY_EMAIL, verifyEmail),
    ])
}
