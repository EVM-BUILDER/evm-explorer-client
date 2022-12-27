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

function updateProfileFromApi(payload) {
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
function* updateProfile({ payload, cbs, cbe }) {
  try {
    const { data, status } = yield call(updateProfileFromApi, payload)
    if (status === 200) {
      if (cbs) cbs(data.data)
    } else if (cbe) cbe(data)
  } catch (error) {
    console.error('updateProfile', error)
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

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GET_PROFILE, getProfile),
    takeLatest(actions.UPDATE_PROFILE, updateProfile),
    takeLatest(actions.UPDATE_KYC, updateKyc),
  ])
}
