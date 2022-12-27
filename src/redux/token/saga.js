import { all, takeLatest, put, call, fork } from 'redux-saga/effects'
import * as qs from 'query-string'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'
import siteConfig from 'config/site.config'

/* Get holder by token */
function getHoldersByTokenFromApi(payload) {
  const tokenAddress = payload?.tokenAddress
  const str = qs.stringify(payload || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/erc20/${tokenAddress}/holder?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getHoldersByToken({ params }) {
  try {
    const { status, data } = yield call(getHoldersByTokenFromApi, params)
    if (status === 200) {
      yield put(actions.getHoldersByTokenSuccess(params, data))
    } else {
      yield put(actions.getHoldersByTokenSuccess(params, null))
    }
  } catch (error) {
    console.error('getHoldersByToken', error)
    yield put(actions.getHoldersByTokenSuccess(params, null))
  }
}

/* Get erc20 txs by token */
function getTxsErc20FromApi(payload) {
  const str = qs.stringify(payload || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/erc20?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getTxsErc20({ params }) {
  try {
    const { status, data } = yield call(getTxsErc20FromApi, params)
    if (status === 200) {
      yield put(actions.getTxsErc20Success(params, data))
    } else {
      yield put(actions.getTxsErc20Success(params, null))
    }
  } catch (error) {
    console.error('getTxsErc20', error)
    yield put(actions.getTxsErc20Success(params, null))
  }
}

/* Get all erc20 */
function* getAllTxsErc20({ params }) {
  try {
    const { status, data } = yield call(getTxsErc20FromApi, params)
    if (status === 200) {
      yield put(actions.getAllTxsErc20Success(data))
    } else {
      yield put(actions.getAllTxsErc20Success(null))
    }
  } catch (error) {
    console.error('getAllTxsErc20', error)
    yield put(actions.getAllTxsErc20Success(null))
  }
}

/* Get all erc20 balances by token */
function getAllErc20BalancesByTokenFromApi(payload) {
  const address = payload?.address
  const str = qs.stringify(payload || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/erc20/${address}/balance?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getAllErc20BalancesByToken({ params }) {
  try {
    const { status, data } = yield call(getAllErc20BalancesByTokenFromApi, params)
    if (status === 200) {
      yield put(actions.getAllErc20BalancesByTokenSuccess(params, data))
    } else {
      yield put(actions.getAllErc20BalancesByTokenSuccess(params, null))
    }
  } catch (error) {
    console.error('getAllErc20BalancesByToken', error)
    yield put(actions.getAllErc20BalancesByTokenSuccess(params, null))
  }
}

/* Get all erc721 balances by token */
function getAllErc721BalancesByTokenFromApi(payload) {
  const address = payload?.address
  const str = qs.stringify(payload || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/erc721/${address}/inventory?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getAllErc721BalancesByToken({ params }) {
  try {
    const { status, data } = yield call(getAllErc721BalancesByTokenFromApi, params)
    if (status === 200) {
      yield put(actions.getAllErc721BalancesByTokenSuccess(params, data))
    } else {
      yield put(actions.getAllErc721BalancesByTokenSuccess(params, null))
    }
  } catch (error) {
    console.error('getAllErc721BalancesByToken', error)
    yield put(actions.getAllErc721BalancesByTokenSuccess(params, null))
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.GET_HOLDERS_BY_TOKEN, getHoldersByToken),
    takeLatest(actions.GET_TXS_ERC20, getTxsErc20),
    takeLatest(actions.GET_ALL_TXS_ERC20, getAllTxsErc20),
    takeLatest(actions.GET_ALL_ERC20_BALANCES_BY_TOKEN, getAllErc20BalancesByToken),
    takeLatest(actions.GET_ALL_ERC721_BALANCES_BY_TOKEN, getAllErc721BalancesByToken),
  ])
}
