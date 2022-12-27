import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getListStatisticsFromApi({ params }) {
  const str = qs.stringify(params || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/statistics?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}

function* getListStatisticsRequest({ payload }) {
  try {
    const { status, data } = yield call(getListStatisticsFromApi, payload)
    if (status === 200) {
      yield put(actions.getListStatisticsSuccess(data))
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    yield put(actions.getListStatisticsFailure(error))
  }
}

function* getPulsePrice({ params }) {
  try {
    const { status, data } = yield call(getListStatisticsFromApi, params)
    if (status === 200) {
      yield put(actions.getPulsePriceSuccess({ data }))
    } else {
      yield put(actions.getPulsePriceSuccess({ data }))
    }
  } catch (error) {
    yield put(actions.getPulsePriceSuccess({ error }))
  }
}

export default function* statisticSaga() {
  yield all([
    takeLatest(actions.GET_STATISTICS_START, getListStatisticsRequest),
    takeLatest(actions.GET_PULSE_PRICE, getPulsePrice),
  ])
}
