import request from 'services/request'

export const getErc721BalancesFromApi = async (address, params) =>
  request({
    url: `/erc721/${address}/inventory`,
    method: 'GET',
    params,
    isAuth: false,
  })
