import { CACHE_LANGUAGE, DEFAULT_LANGUAGE, getLanguage } from 'config/language/config'
import { isServer } from 'utils/isServer'
import actions from './actions'

const languageLocal = !isServer ? localStorage.getItem(CACHE_LANGUAGE) : undefined
const language = languageLocal || DEFAULT_LANGUAGE || 'en'
const selectLanguage = getLanguage(language)

const initState = {
  language: selectLanguage ? selectLanguage.code : DEFAULT_LANGUAGE,
}

export default function LanguageReducer(state = initState, action) {
  const { payload } = action
  switch (action.type) {
    case actions.CHANGE_LANGUAGE:
      if (!isServer) {
        localStorage.setItem(CACHE_LANGUAGE, payload || DEFAULT_LANGUAGE)
      }
      return {
        ...state,
        language: payload || DEFAULT_LANGUAGE,
      }
    default:
      return state
  }
}
