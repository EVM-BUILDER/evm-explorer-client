import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getListAbisFromApi(params) {
  const str = qs.stringify(params || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/abi?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getListAbisRequest({ payload }) {
  const { params } = payload
  try {
    const { status, data } = yield call(getListAbisFromApi, params)
    if (status === 200) {
      yield put(actions.getListAbisSuccess({ ...data }))
    }
  } catch (error) {
    yield put(actions.getListAbisFailure(error))
  }
}

function addAbiFromApi({ data }) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/abi`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* addAbiRequest({ payload }) {
  try {
    const { status, data } = yield call(addAbiFromApi, payload)

    if (status === 200) {
      yield put(actions.addAbiSuccess(data))
    }
  } catch (error) {
    yield put(actions.addAbiFailure(error))
  }
}

function deleteAbiFromApi({ data }) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/delete-abi`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* deleteAbiRequest({ payload }) {
  try {
    const { status, data } = yield call(deleteAbiFromApi, payload)

    if (status === 200) {
      yield put(actions.addAbiSuccess(data))
    }
  } catch (error) {
    yield put(actions.addAbiFailure(error))
  }
}

export default function* abisSaga() {
  yield all([
    takeLatest(actions.GET_ABIS_START, getListAbisRequest),
    takeLatest(actions.ADD_ABI, addAbiRequest),
    takeLatest(actions.DELETE_ABI, deleteAbiRequest),
  ])
}
