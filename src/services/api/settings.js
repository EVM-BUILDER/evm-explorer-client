import request from 'services/request'

export const getSettings = async (params) =>
  request({
    url: `/setting/get`,
    method: 'GET',
    params,
    isAuth: false,
  })
