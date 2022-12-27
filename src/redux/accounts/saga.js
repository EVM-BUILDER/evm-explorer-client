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

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_TOP_ACCOUNT, getTopAccounts)])
}
