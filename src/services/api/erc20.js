import request from 'services/request'

export const getErc20TransfersFromApi = async (params) =>
  request({
    url: `/erc20`,
    method: 'GET',
    params,
    isAuth: false,
  })

export const getErc20HoldersFromApi = async (address, params) =>
  request({
    url: `/erc20/${address}/holder`,
    method: 'GET',
    params,
    isAuth: false,
  })

export const getErc20BalancesFromApi = async (address, params) =>
  request({
    url: `/erc20/${address}/balance`,
    method: 'GET',
    params,
    isAuth: false,
  })
