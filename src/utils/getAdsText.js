const { random } = require('lodash')

export function getRandomAdsText(adsArr) {
  const adsLength = adsArr.length
  return adsArr[random(0, adsLength - 1)]
}
