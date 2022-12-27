import Cookies from 'js-cookie'
import { TOKEN_KEY, CACHE_PROFILE } from 'config/constants'
import fetchHelper from 'library/helpers/FetchHelper'
import { isServer } from './isServer'

export function setAuthToken(token) {
  if (!token) return false
  fetchHelper.addDefaultHeader('Token', `Bearer ${token}`)
  const setToken = Cookies.set(TOKEN_KEY, token)
  return setToken ? token : false
}
export function getAuthToken() {
  if (!isServer) {
    const authCode = Cookies.get(TOKEN_KEY)
    if (authCode) {
      return authCode
    }
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(CACHE_PROFILE)
  }
  return null
}
export function clearToken() {
  if (!isServer) {
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(CACHE_PROFILE)
    return true
  }
  return false
}

export function setProfileUser(data) {
  if (!isServer) {
    const profileUser = localStorage.setItem(CACHE_PROFILE, JSON.stringify(data))
    if (profileUser) {
      return profileUser
    }
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(CACHE_PROFILE)
  }
  return undefined
}

export function getProfileUser() {
  if (!isServer) {
    const profileUser = JSON.parse(localStorage.getItem(CACHE_PROFILE))
    if (profileUser) {
      return profileUser
    }
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(CACHE_PROFILE)
  }
  return null
}

export const isLogin = () => {
  const token = getAuthToken()
  const profile = getProfileUser()
  if (token && profile) {
    fetchHelper.addDefaultHeader('Token', `Bearer ${token}`)
  }
  return token && profile
}
