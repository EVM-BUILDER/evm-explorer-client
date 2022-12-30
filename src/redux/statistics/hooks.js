import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getRandomAdsText } from 'utils/getAdsText'

export function useAds() {
  const { settings } = useSelector((state) => state.Settings)
  return useMemo(
    () => ({
      adsText: getRandomAdsText(settings?.ads_text || []),
      adsBanner: getRandomAdsText(settings?.ads_banner || []),
    }),
    [settings?.ads_banner, settings?.ads_text],
  )
}
