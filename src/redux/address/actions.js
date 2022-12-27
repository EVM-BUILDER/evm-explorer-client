export const GET_ADDRESS_DETAIL = 'GET_ADDRESS_DETAIL'
export const GET_ADDRESS_DETAIL_SUCCESS = 'GET_ADDRESS_DETAIL_SUCCESS'

export const getAddressDetail = (payload) => ({
  payload,
  type: GET_ADDRESS_DETAIL,
})
export const getAddressDetailSuccess = (payload) => ({
  type: GET_ADDRESS_DETAIL_SUCCESS,
  payload,
})

export const GET_LIST_ADDRESS_START = 'GET_LIST_ADDRESS_START'
export const GET_LIST_ADDRESS_SUCCESS = 'GET_LIST_ADDRESS_SUCCESS'

export const getListAddress = (params) => ({
  type: GET_LIST_ADDRESS_START,
  params,
})

export const getListAddressSuccess = data => ({
  type: GET_LIST_ADDRESS_SUCCESS,
  payload: data,
})
