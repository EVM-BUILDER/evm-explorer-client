export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS'

export const GET_OTP_REQUEST = 'GET_OTP_REQUEST'

export const FORGOT_REQUEST = 'FORGOT_REQUEST'

export const VERIFY_EMAIL = 'VERIFY_EMAIL'

export const registerRequest = (payload, cbs, cbe) => ({
  type: REGISTER_REQUEST,
  payload,
  cbs,
  cbe,
})
export const loginRequest = (payload, cbs, cbe) => ({
  type: LOGIN_REQUEST,
  payload,
  cbs,
  cbe,
})
export const loginSuccess = (payload, cbs, cbe) => ({
  type: LOGIN_SUCCESS,
  payload,
  cbs,
  cbe,
})

export const logoutRequest = (params, cbs, cbe) => ({
  type: LOGOUT_REQUEST,
  params,
  cbs,
  cbe,
})
export const logoutSuccess = (params, cbs, cbe) => ({
  type: LOGOUT_REQUEST_SUCCESS,
  params,
  cbs,
  cbe,
})

export const getOTP = (params, cbs, cbe) => ({
  type: GET_OTP_REQUEST,
  params,
  cbs,
  cbe,
})

export const forgotRequest = (params, cbs, cbe) => ({
  type: FORGOT_REQUEST,
  params,
  cbs,
  cbe,
})

export const requestVerifyEmail = (params, cbs, cbe) => ({
  type: VERIFY_EMAIL,
  params,
  cbs,  
  cbe,
})