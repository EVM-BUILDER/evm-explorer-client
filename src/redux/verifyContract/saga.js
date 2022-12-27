import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as actions from './actions'
import siteConfig from 'config/site.config'

/* Get holder by token */
function verifyContractFromApi(payload) {
  const formData = new FormData()
  formData.append('address', payload.address)
  formData.append('solc_version', payload.solc_version)
  formData.append('sources', payload.sources)
  fetchHelper.removeDefaultHeader('Content-Type')
  const response = fetchHelper
    .fetch(`${siteConfig.apiUrl}/auth/contract/submit`, {
      method: 'POST',
      body: formData,
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
  fetchHelper.addDefaultHeader('Content-Type', 'application/json')
  return response
}
function* verifyContract({ params, cbs, cbe }) {
  try {
    const { status, data } = yield call(verifyContractFromApi, params)
    if (status === 200) {
      yield put(actions.verifyContractSuccess(params, data.data))
      cbs?.(data.data)
    } else {
      yield put(actions.verifyContractSuccess(params, null, data))
      cbe?.(data)
    }
  } catch (error) {
    console.error('verifyContract', error)
    yield put(actions.verifyContractSuccess(params, null, error))
    cbe?.(error)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.VERIFY_CONTRACT, verifyContract)])
}
