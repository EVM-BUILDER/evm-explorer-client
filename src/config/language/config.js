import messagesEn from './translations/en.json'
import messagesVi from './translations/vi.json'

export const CACHE_LANGUAGE = 'lang'
export const DEFAULT_LANGUAGE = 'en'

export const languages = {
  en: messagesEn,
  vi: messagesVi,
}

export const OPTIONS_LANG = [
  { code: 'en', label: 'EN', icon: '/images/flags/en.png' },
  {
    code: 'vi',
    label: 'VI',
    icon: '/images/flags/vn.png',
  },
]

export function getLanguage(lang) {
  return OPTIONS_LANG.find((language) => language.code === lang)
}
