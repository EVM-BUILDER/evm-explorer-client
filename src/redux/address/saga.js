import { all, takeLatest, put, call } from 'redux-saga/effects'
import * as qs from 'query-string'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'
import siteConfig from 'config/site.config'

/* Get token detail */
function getAddressDetailFromApi(address) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/address/${address}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getAddressDetail({ payload }) {
  try {
    const { status, data } = yield call(getAddressDetailFromApi, payload)
    if (status === 200) {
      yield put(actions.getAddressDetailSuccess(data.data))
    } else {
      yield put(actions.getAddressDetailSuccess(null))
    }
  } catch (error) {
    yield put(actions.getAddressDetailSuccess(null))
  }
}

function getListAddressFromApi(payload) {
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

function* getListAddress({ params }) {
  try {
    const { status, data } = yield call(getListAddressFromApi, params)
    if (status === 200) {
      yield put(actions.getListAddressSuccess(data))
    } else {
      yield put(actions.getListAddressSuccess(null))
    }
  } catch (error) {
    console.error('getListAddress', error)
    yield put(actions.getListAddressSuccess(null))
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_ADDRESS_DETAIL, getAddressDetail)])
  yield all([takeLatest(actions.GET_LIST_ADDRESS_START, getListAddress)])
}
