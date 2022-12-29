import { all, takeLatest, put, call } from 'redux-saga/effects'
import fetchHelper from 'library/helpers/FetchHelper'
import * as qs from 'query-string'
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

function getListContractsVerifiedFromApi(params) {
  const str = qs.stringify(params || {})
  console.log(`${siteConfig.apiUrl}/contract/verified?${str}`)
  return fetchHelper
    .fetch(`${siteConfig.apiUrl}/contract/verified?${str}`, {
      method: 'GET',
    })
    .then(([data, status]) => {
      return {
        data,
        status,
      }
    })
}

function* getListContractsVerifiedRequest({ params }) {
  try {
    const { status, data } = yield call(getListContractsVerifiedFromApi, params)
    console.log(status, data);
    if (status === 200) {
      yield put(actions.getListContractsVerifiedSuccess(data))
    }
  } catch (error) {
    yield put(actions.getListContractsVerifiedSuccess(null))
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.VERIFY_CONTRACT, verifyContract)])
  yield all([takeLatest(actions.GET_CONTRACTS_VERIFIED_START, getListContractsVerifiedRequest)])
}
