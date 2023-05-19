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
    },
    {
      isToastSuccess: true,
      isToastFailed: true,
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
      yield put(actions.updateUserSuccess(data))
    }
  } catch (error) {
    yield put(actions.updateUserFailure(error))
  }
}

function createUserFromApi({ data }) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/create-user`, {
      method: 'POST',
      body: JSON.stringify(data),
    },
    {
      isToastSuccess: true,
      isToastFailed: true,
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* createUserRequest({ payload }) {
  try {
    const { status, data } = yield call(createUserFromApi, payload)

    if (status === 200) {
      yield put(actions.createUserSuccess(data))
    }
  } catch (error) {
    yield put(actions.createUserFailure(error))
  }
}

function deleteUserFromApi({ email }) {
  const data = {
    emails: [email],
  }
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/delete-user`, {
      method: 'POST',
      body: JSON.stringify(data),
    },
    {
      isToastSuccess: true,
      isToastFailed: true,
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}
function* deleteUserRequest({ payload }) {
  try {
    const { status, data } = yield call(deleteUserFromApi, payload)

    if (status === 200) {
      yield put(actions.createUserSuccess(data))
    }
  } catch (error) {
    yield put(actions.createUserFailure(error))
  }
}

export default function* usersSaga() {
  yield all([
    takeLatest(actions.GET_USERS_START, getListUsersRequest),
    takeLatest(actions.UPDATE_USER, updateUserRequest),
    takeLatest(actions.CREATE_USER, createUserRequest),
    takeLatest(actions.GET_USER_DETAIL_START, geUserDetailRequest),
    takeLatest(actions.DELETE_USER, deleteUserRequest),
  ])
}

export function sendMailUsersFromApi(data) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/notify`, {
      method: 'POST',
      body: JSON.stringify(data),
    },)
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}

export function sendMailAllUsersFromApi(data) {
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/admin/notify/all`, {
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
