import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'

import * as actions from './actions'
import siteConfig from 'config/site.config'

function getListBlocksFromApi({ params }) {
  const str = qs.stringify(params || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/block?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}

function* getListBlocksRequest({ payload }) {
  try {
    const { status, data } = yield call(getListBlocksFromApi, payload)
    if (status === 200) {
      yield put(actions.getListBlocksSuccess({ ...data }))
    }
  } catch (error) {
    yield put(actions.getListBlocksFailure(error))
  }
}

function getBlockDetailFromApi(block) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/block/${block}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}

function* geBlockDetailRequest({ payload }) {
  try {
    const { status, data } = yield call(getBlockDetailFromApi, payload?.block)

    if (status === 200) {
      yield put(actions.getBlockDetailSuccess(data))
    }
  } catch (error) {
    yield put(actions.getBlockDetailFailure(error))
  }
}

export default function* blockSaga() {
  yield all([
    takeLatest(actions.GET_BLOCKS_START, getListBlocksRequest),
    takeLatest(actions.GET_BLOCK_DETAIL_START, geBlockDetailRequest),
  ])
}
