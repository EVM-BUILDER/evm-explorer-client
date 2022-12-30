export const GET_PROFILE = 'GET_PROFILE'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const UPDATE_KYC = 'UPDATE_KYC'

export const getProfile = (payload, cbs, cbe) => ({
  type: GET_PROFILE,
  payload,
  cbs,
  cbe,
})
export const getProfileSuccess = (payload) => ({
  type: GET_PROFILE_SUCCESS,
  payload,
})

export const REQUEST_UPDATE_PROFILE = 'REQUEST_UPDATE_PROFILE'
export const requestUpdateProfile = (payload, cbs, cbe) => ({
  type: REQUEST_UPDATE_PROFILE,
  payload,
  cbs,
  cbe,
})

export const updateKyc = (payload, cbs, cbe) => ({
  type: UPDATE_KYC,
  payload,
  cbs,
  cbe,
})

export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD'
export const requestChangePassword = (payload, cbs, cbe) => ({
  type: REQUEST_CHANGE_PASSWORD,
  payload,
  cbs,
  cbe,
})
