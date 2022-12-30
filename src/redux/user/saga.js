import { all, takeLatest, call, put } from 'redux-saga/effects'
import siteConfig from 'config/site.config'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'

function getProfileFromApi() {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/user/get-profiles`, {
      method: 'GET',
    })
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* getProfile({ cbs, cbe }) {
  try {
    const { data, status } = yield call(getProfileFromApi)
    if (status === 200) {
      yield put(actions.getProfileSuccess(data.data))
      cbs?.(data.data)
    } else {
      cbe?.(data)
    }
  } catch (error) {
    console.error('getProfile', error)
    cbe?.(error)
  }
}

function requestUpdateProfileFromApi(payload) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/user/set-profiles`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* requestUpdateProfile({ payload, cbs, cbe }) {
  try {
    const { data } = yield call(requestUpdateProfileFromApi, payload)
    if (data.status === 200) {
      if (cbs) cbs(data.data)
    } else if (cbe) cbe(data)
  } catch (error) {
    console.error('requestUpdateProfile', error)
    if (cbe) cbe(error)
  }
}

function updateKycFromApi(payload) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/customer/kyc/request`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* updateKyc({ payload, cbs, cbe }) {
  try {
    const { data } = yield call(updateKycFromApi, payload)
    if (data.code === 200) {
      yield put(actions.getProfileSuccess(data.data))
      if (cbs) cbs(data.data)
    } else if (cbe) cbe(data)
  } catch (error) {
    console.error('updateKyc', error)
    if (cbe) cbe(error)
  }
}

function requestChangePasswordFromApi(payload) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/user/change_password`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* requestChangePassword({ payload, cbs, cbe }) {
  try {
    const { data } = yield call(requestChangePasswordFromApi, payload)
    if (data.status === 200) {
      if (cbs) cbs(data.data)
    } else if (cbe) cbe(data)
  } catch (error) {
    console.error('requestChangePassword', error)
    if (cbe) cbe(error)
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GET_PROFILE, getProfile),
    takeLatest(actions.REQUEST_UPDATE_PROFILE, requestUpdateProfile),
    takeLatest(actions.UPDATE_KYC, updateKyc),
    takeLatest(actions.REQUEST_CHANGE_PASSWORD, requestChangePassword),
  ])
}
