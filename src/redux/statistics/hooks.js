import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getRandomAdsText } from 'utils/getAdsText'

export function useAds() {
  const { settings } = useSelector((state) => state.Settings)
  return useMemo(() => getRandomAdsText(settings?.ads_text || []), [settings?.ads_text])
}
