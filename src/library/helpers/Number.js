/* eslint-disable no-param-reassign */
import numeral from 'numeral'
import BigNumber from 'bignumber.js'

export const isNumber = (num) => {
  if (num !== undefined && num !== null && num !== '' && !Number.isNaN(+num)) {
    return true
  }
  return false
}

export const withNoExponents = (num) => {
  if (`${num}`.includes('e')) {
    var data = String(num).split(/[eE]/)
    if (data.length == 1) return data[0]

    var z = '',
      sign = num < 0 ? '-' : '',
      str = data[0].replace('.', ''),
      mag = Number(data[1]) + 1

    if (mag < 0) {
      z = sign + '0.'
      while (mag++) z += '0'
      return z + str.replace(/^\-/, '')
    }
    mag -= str.length
    while (mag--) z += '0'
    return str + z
  }
  return num
}

/**
 * Method to format the display of wei given an EthersBigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (
  number,
  options = {
    decimals: -18,
    noExpo: false,
  },
) => {
  const { decimals, noExpo } = {
    decimals: -18,
    noExpo: false,
    ...options,
  }
  if (!number) return number
  const remainder = new BigNumber(number).shiftedBy(decimals).toString()
  if (noExpo) return withNoExponents(remainder)
  return remainder
}

// ================================================================================
export function roundNumber(n, options) {
  const {
    scale = 3,
    scaleSmall,
    decimals,
  } = options || {
    scale: 3,
  }

  let customScale = scale
  if (!isNumber(n)) return 0
  if (scaleSmall && n > 10) {
    customScale = scaleSmall
  }
  if (n && decimals) {
    n = new BigNumber(n).shiftedBy(-decimals).toString()
  }
  if (scale === false) return withNoExponents(n)

  n = parseFloat(n)

  if (n > 1e17) return withNoExponents(Math.round(n))
  const num = typeof n !== 'number' ? 0 : parseFloat(n)
  if (!`${num}`.includes('e')) {
    return +`${Math.floor(+`${num}e+${customScale}`)}e-${customScale}`
  }
  const arr = `${num}`.split('e')
  let sig = ''
  if (+arr[1] + customScale > 0) {
    sig = '+'
  }
  return +`${Math.floor(+`${+arr[0]}e${sig}${+arr[1] + customScale}`)}e-${customScale}`
}

// ================================================================================
// Returns first 2 digits after first non-zero decimal
// i.e. 0.001286 -> 0.0012, 0.9845 -> 0.98, 0.0102 -> 0.010, etc
// Intended to be used for tokens whose value is less than $1
// https://stackoverflow.com/a/23887837
export const getFirstThreeNonZeroDecimals = (value) => value.toFixed(9).match(/^-?\d*\.?0*\d{0,2}/)[0]

// export type formatAmountNotation = 'compact' | 'standard'

/**
 * This function is used to format token prices, liquidity, amount of tokens in TX, and in general any numbers on info section
 * @param amount - amount to be formatted
 * @param notation - whether to show 1M or 1,000,000
 * @param displayThreshold - threshold below which it will return simply <displayThreshold instead of actual value, e.g. if 0.001 -> returns <0.001 for 0.0005
 * @param tokenPrecision - set to true when you want precision to be 3 decimals for values < 1 and 2 decimals for values > 1
 * @param isInteger - if true the values will contain decimal part only if the amount is > 1000
 * @returns formatted string ready to be displayed
 */
export const formatAmount = (amount, options) => {
  const {
    notation = 'compact',
    displayThreshold,
    tokenPrecision,
    isInteger,
    roundUp,
    decimals,
    scale,
  } = options || {
    notation: 'compact',
  }
  if (amount === 0) {
    if (isInteger) {
      return '0'
    }
    return '0.00'
  }
  if (!amount) return '--'
  if (amount && decimals) {
    amount = new BigNumber(amount).shiftedBy(-decimals).toNumber()
  }
  if (displayThreshold && amount < displayThreshold) {
    return `<${displayThreshold}`
  }
  if (amount < 1 && !tokenPrecision) {
    return getFirstThreeNonZeroDecimals(amount)
  }

  let precision = 2
  if (tokenPrecision) {
    precision = amount < 1 ? 3 : 2
  }

  let format = `0,0.${'0'.repeat(precision)}a`

  if (notation === 'standard') {
    format = `0,0.${'0'.repeat(precision)}`
  }

  if (scale) {
    format = `0,0.[${'0'.repeat(precision)}]a`
  }

  if (isInteger && amount < 1000) {
    format = '0'
  }

  /**
   * @dev Check round down
   * Not working with number => 1e20
   */
  if (amount > 999 && !roundUp) {
    const amountStr = Math.trunc(amount).toString()
    const i = Math.floor(Math.log(amount) / Math.log(1000))
    const fistCount = Math.floor(amount / 1000 ** i).toString().length + precision
    amount = Number(amountStr.substring(0, fistCount) + '0'.repeat(amountStr.substring(fistCount, amountStr.length).length))
  }

  const amountWithPrecision = parseFloat(amount?.toFixed(precision))

  // toUpperCase is needed cause numeral doesn't have support for capital K M B out of the box
  return numeral(amountWithPrecision).format(format).toUpperCase()
}
