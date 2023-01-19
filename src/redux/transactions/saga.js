import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getListTransactionFromApi(params) {
  const str = qs.stringify(params || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/transaction?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getListTransactionsRequest({ payload }) {
  const { params } = payload
  try {
    const { status, data } = yield call(getListTransactionFromApi, params)
    if (status === 200) {
      yield put(actions.getListTransactionsSuccess({ ...data }))
    }
  } catch (error) {
    yield put(actions.getListTransactionsFailure(error))
  }
}

function getTransactionDetailFromApi(txHash) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/transaction/${txHash}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* geTransactionDetailRequest({ payload }) {
  try {
    const { status, data } = yield call(getTransactionDetailFromApi, payload?.txHash)

    if (status === 200) {
      yield put(actions.getTransactionDetailSuccess(data))
    }
  } catch (error) {
    yield put(actions.getTransactionDetailFailure(error))
  }
}

/* Get holder by token */
function* getTxsByAddress({ params }) {
  try {
    const { status, data } = yield call(getListTransactionFromApi, params)
    if (status === 200) {
      yield put(actions.getTxsByAddressSuccess(params, data))
    } else {
      yield put(actions.getTxsByAddressSuccess(params, null))
    }
  } catch (error) {
    console.error('getTxsByAddress', error)
    yield put(actions.getTxsByAddressSuccess(params, null))
  }
}

export default function* transactionSaga() {
  yield all([
    takeLatest(actions.GET_TRANSACTIONS_START, getListTransactionsRequest),
    takeLatest(actions.GET_TRANSACTION_DETAIL_START, geTransactionDetailRequest),
    takeLatest(actions.GET_TXS_BY_ADDRESS, getTxsByAddress),
  ])
}
