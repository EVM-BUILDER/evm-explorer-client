export const GET_PROFILE = 'GET_PROFILE'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const UPDATE_KYC = 'UPDATE_KYC'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

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

export const updateProfile = (payload, cbs, cbe) => ({
  type: UPDATE_PROFILE,
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
