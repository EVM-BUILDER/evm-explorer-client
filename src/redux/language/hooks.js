import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from './actions'

export function useLanguage() {
  const dispatch = useDispatch()
  const { language } = useSelector((state) => state.Language)
  const setLanguage = useCallback(
    (language) => {
      dispatch(actions.changeLanguage(language))
    },
    [dispatch],
  )
  return { language, setLanguage }
}
