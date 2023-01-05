import { createStorageJSON, getFromStorageJSON } from 'library/storage'
import { isServer } from 'utils/isServer'
import * as actions from './actions'

export const CACHE_SETTINGS = 'settings'

const DEFAULT_SETTING = {}

const settingsLocal = !isServer ? getFromStorageJSON(CACHE_SETTINGS) : undefined

const initState = {
  settings: settingsLocal || DEFAULT_SETTING,
  adminSettings: settingsLocal || DEFAULT_SETTING,
  listGoogleFont: [],
}

export default function SettingsReducer(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case actions.GET_SETTINGS_SUCCESS:
      if (!isServer) {
        createStorageJSON(CACHE_SETTINGS, payload || DEFAULT_SETTING)
      }
      return {
        ...state,
        settings: payload || DEFAULT_SETTING,
      }
    case actions.GET_ADMIN_SETTINGS_SUCCESS:
      return {
        ...state,
        adminSettings: payload || DEFAULT_SETTING,
      }
    case actions.SET_SETTINGS_SUCCESS:
      if (!isServer) {
        createStorageJSON(CACHE_SETTINGS, payload || DEFAULT_SETTING)
      }
      return {
        ...state,
        settings: payload || DEFAULT_SETTING,
      }

    case actions.GET_LIST_GOOLE_FONT_SUCCESS:
      return {
        ...state,
        listGoogleFont: payload || [],
      }
    default:
      return state
  }
}
