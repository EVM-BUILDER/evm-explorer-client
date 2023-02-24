export const ADD_ABI = 'ADD_ABI'
export const ADD_ABI_SUCCESS = 'ADD_ABI_SUCCESS'
export const ADD_ABI_FAILURE = 'ADD_ABI_FAILURE'

export const DELETE_ABI = 'DELETE_ABI'
export const DELETE_ABI_SUCCESS = 'DELETE_ABI_SUCCESS'
export const DELETE_ABI_FAILURE = 'DELETE_ABI_FAILURE'

export const GET_ABIS_REQUEST = 'GET_ABIS_REQUEST'
export const GET_ABIS_START = 'GET_ABIS_START'
export const GET_ABIS_SUCCESS = 'GET_ABIS_SUCCESS'
export const GET_ABIS_FAILURE = 'GET_ABIS_FAILURE'

export const UPDATE_STATUS = 'UPDATE_STATUS'

export const getListAbis = (params) => ({
  type: GET_ABIS_START,
  payload: { params },
})
export const getListAbisSuccess = (data) => ({
  type: GET_ABIS_SUCCESS,
  payload: data,
})
export const getListAbisFailure = (error) => ({
  type: GET_ABIS_FAILURE,
  payload: error,
})

export const addAbi = (data) => ({
  type: ADD_ABI,
  payload: { data },
})
export const addAbiSuccess = (data) => ({
  type: ADD_ABI_SUCCESS,
  payload: data,
})
export const addAbiFailure = (error) => ({
  type: ADD_ABI_FAILURE,
  payload: error,
})

export const deleteAbi = (data) => ({
  type: DELETE_ABI,
  payload: { data },
})
export const deleteAbiSuccess = (data) => ({
  type: DELETE_ABI_SUCCESS,
  payload: data,
})
export const deleteAbiFailure = (error) => ({
  type: DELETE_ABI_FAILURE,
  payload: error,
})

export const updateStatus = () => ({
  type: UPDATE_STATUS,
})
