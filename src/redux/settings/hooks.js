import { useSelector } from 'react-redux'

export function useSettings() {
  const { settings } = useSelector((state) => state.Settings)
  return { ...(settings || {}) }
}
