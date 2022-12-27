import axios from 'axios'
import queryString from 'query-string'

import webStorage from 'utils/webStorage'
import { getCookiesByKey } from 'utils/cookiesServerside'
import siteConfig from 'config/site.config'

import { TOKEN_KEY } from 'config/constants'

const baseApiConfig = {
  baseURL: siteConfig.apiUrl,
  headers: {
    'content-type': 'application/json',
    'cache-control': 'no-cache, no-store, must-revalidate',
  },
  timeout: 60000, // 60s
  paramsSerializer: (params) => queryString.stringify(params),
}

const SESSION_EXPIRED_STATUS_CODE = 401

const baseApiClient = axios.create(baseApiConfig)

const request = ({ context, tokenClient, ...options }) => {
  // Serverside
  if (context) {
    const token = getCookiesByKey(context, TOKEN_KEY)
    if (token) {
      baseApiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }

  // /Clientside
  if (tokenClient) {
    const token = webStorage.getToken()
    baseApiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  const onSuccess = (response) => {
    return response?.data
  }

  const onError = (error) => {
    if (error?.response?.status === SESSION_EXPIRED_STATUS_CODE) {
      webStorage.removeAll()
    }

    return Promise.reject(error.response)
  }

  return baseApiClient({ ...options })
    .then(onSuccess)
    .catch(onError)
}

export default request
