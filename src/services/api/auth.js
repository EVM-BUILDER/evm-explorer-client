import request from 'services/request'

export const registerRequestApi = async (params) =>
  request({
    url: `/register`,
    method: 'POST',
    data: params,
    isAuth: false,
  })

export const loginRequestApi = async (params) =>
  request({
    url: `/login`,
    method: 'POST',
    data: params,
    isAuth: false,
  })
