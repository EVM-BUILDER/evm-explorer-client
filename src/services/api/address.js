import request from 'services/request'

export const getAddressDetailFromApi = async (address) =>
  request({
    url: `/address/${address}`,
    method: 'GET',
    isAuth: false,
  })
