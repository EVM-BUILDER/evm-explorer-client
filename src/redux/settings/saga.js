import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'
import siteConfig from 'config/site.config'

function updateSettingsFromApi(payload) {
  return fetchHelper
    .fetch(
      `${siteConfig.apiUrl}/admin/setting/set`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
      {
        isToastSuccess: true,
        isToastFailed: true,
      },
    )
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* updateSettings({ payload }) {
  try {
    const { status } = yield call(updateSettingsFromApi, payload)
    if (status === 200) {
      yield put(actions.setSettingsSuccess(payload))
    }
  } catch (error) {}
}

function getListGoogleFontFromApi() {
  return fetchHelper
    .fetch(`/api/google-font`, {
      method: 'GET',
    })
    .then(([resp, status]) => ({
      data: resp,
      status,
    }))
}
function* getListGoogleFont() {
  try {
    const { data, status } = yield call(getListGoogleFontFromApi)
    if (status === 200) {
      yield put(actions.getListGoogleFontSuccess(data))
    }
  } catch (error) {}
}

export default function* statisticSaga() {
  yield all([takeLatest(actions.SET_SETTINGS, updateSettings), takeLatest(actions.GET_LIST_GOOLE_FONT, getListGoogleFont)])
}
