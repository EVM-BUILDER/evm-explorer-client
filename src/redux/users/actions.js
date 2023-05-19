export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'


export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export const GET_USERS_START = 'GET_USERS_START'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE'

export const GET_USER_DETAIL_START = 'GET_USER_DETAIL_START'
export const GET_USER_DETAIL_SUCCESS = 'GET_USER_DETAIL_SUCCESS'
export const GET_USER_DETAIL_FAILURE = 'GET_USER_DETAIL_FAILURE'

export const UPDATE_STATUS = 'UPDATE_STATUS'

export const getListUsers = (params) => ({
  type: GET_USERS_START,
  payload: { params },
})
export const getListUsersSuccess = (data) => ({
  type: GET_USERS_SUCCESS,
  payload: data,
})
export const getListUsersFailure = (error) => ({
  type: GET_USERS_FAILURE,
  payload: error,
})

export const getUserDetail = (userId, email) => ({
  type: GET_USER_DETAIL_START,
  payload: { userId, email },
})
export const getUserDetailSuccess = (data) => ({
  type: GET_USER_DETAIL_SUCCESS,
  payload: data,
})
export const getUserDetailFailure = (error) => ({
  type: GET_USER_DETAIL_FAILURE,
  payload: error,
})

export const updateUser = (data) => ({
  type: UPDATE_USER,
  payload: { data },
})
export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
})
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
})

export const createUser = (data) => ({
  type: CREATE_USER,
  payload: { data },
})
export const createUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  payload: data,
})
export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
})

export const deleteUser = (email) => ({
  type: DELETE_USER,
  payload: { email },
})
export const deleteUserSuccess = (data) => ({
  type: CREATE_USER_SUCCESS,
  payload: data,
})
export const deleteUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
})

export const updateStatus = () => ({
  type: UPDATE_STATUS,
})
