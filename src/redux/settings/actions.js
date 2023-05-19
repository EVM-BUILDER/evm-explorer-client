export const GET_SETTINGS = 'GET_SETTINGS'
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS'

export const getSettings = (payload) => ({
  type: GET_SETTINGS,
  payload,
})

export const getSettingsSuccess = (payload) => ({
  type: GET_SETTINGS_SUCCESS,
  payload,
})

export const GET_ADMIN_SETTINGS = 'GET_ADMIN_SETTINGS'
export const GET_ADMIN_SETTINGS_SUCCESS = 'GET_ADMIN_SETTINGS_SUCCESS'

export const getAdminSettings = () => ({
  type: GET_ADMIN_SETTINGS,
})

export const getAdminSettingsSuccess = (payload) => ({
  type: GET_ADMIN_SETTINGS_SUCCESS,
  payload,
})

export const SET_SETTINGS = 'SET_SETTINGS'
export const SET_SETTINGS_SUCCESS = 'SET_SETTINGS_SUCCESS'

export const setSettings = (payload) => ({
  type: SET_SETTINGS,
  payload,
})

export const setSettingsSuccess = (payload) => ({
  type: SET_SETTINGS_SUCCESS,
  payload,
})


export const GET_LIST_GOOLE_FONT = 'GET_LIST_GOOLE_FONT'
export const GET_LIST_GOOLE_FONT_SUCCESS = 'GET_LIST_GOOLE_FONT_SUCCESS'

export const getListGoogleFont = (payload) => ({
  type: GET_LIST_GOOLE_FONT,
  payload,
})

export const getListGoogleFontSuccess = (payload) => ({
  type: GET_LIST_GOOLE_FONT_SUCCESS,
  payload,
})

export const GET_RESOURCE = 'GET_RESOURCE'
export const GET_RESOURCE_SUCCESS = 'GET_RESOURCE_SUCCESS'

export const getResource = (payload) => ({
  type: GET_RESOURCE,
  payload,
})

export const getResourceSuccess = (payload) => ({
  type: GET_RESOURCE_SUCCESS,
  payload,
})