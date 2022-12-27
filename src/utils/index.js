import { Contract } from '@ethersproject/contracts'
import memoize from 'lodash/memoize'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'

export function toLocaleString(x) {
  return x.toLocaleString('fullwide', { useGrouping: false })
}

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = memoize((value) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})
export function isTxhash(addr) {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr)
}

export function isEqual(value, other) {
  if (value === other) return true

  // Get the value type
  var type = Object.prototype.toString.call(value)
  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false
  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false
  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length
  if (valueLen !== otherLen) return false

  // Compare two items
  var compare = function (item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1)
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false
    }
    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false
      } else {
        if (item1 !== item2) return false
      }
    }
  }
  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false
      }
    }
  }
  // If nothing failed, return true
  return true
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address, ABI, signer) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}
