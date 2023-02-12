import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function getListUserFromApi(params) {
  const str = qs.stringify(params || {})
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/users/get?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* getListUsersRequest({ payload }) {
  const { params } = payload
  try {
    const { status, data } = yield call(getListUserFromApi, params)
    if (status === 200) {
      yield put(actions.getListUsersSuccess({ ...data }))
    }
  } catch (error) {
    yield put(actions.getListUsersFailure(error))
  }
}

function getUserDetailFromApi(userId, email) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/users/get-detail?userId=${userId}&email=${email}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* geUserDetailRequest({ payload }) {
  try {
    const { status, data } = yield call(getUserDetailFromApi, payload?.userId, payload?.email)

    if (status === 200) {
      yield put(actions.getUserDetailSuccess(data))
    }
  } catch (error) {
    yield put(actions.getUserDetailFailure(error))
  }
}

function updateUserFromApi({ data }) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/update_user_info`, {
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
function* updateUserRequest({ payload }) {
  try {
    const { status, data } = yield call(updateUserFromApi, payload)

    if (status === 200) {
      yield put(actions.getUserDetailSuccess(data))
    }
  } catch (error) {
    yield put(actions.getUserDetailFailure(error))
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(actions.GET_USERS_START, getListUsersRequest),
    takeLatest(actions.UPDATE_USER, updateUserRequest),
    takeLatest(actions.GET_USER_DETAIL_START, geUserDetailRequest),
  ])
}
