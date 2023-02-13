import { formatCode } from 'library/helpers/CommonHelper'

/**
 * type = center | right | undefined
 */
export const formatAddress = (address, options) => {
    const { type, start = 5, end = 5 } = options || {}

    if (!address) return ''
    if (typeof address === 'string') return address
    if (address.pro && address.pro.na) return address?.pro?.na
    if (!address.a) return ''

    switch (type) {
        case 'center':
            return formatCode(address.a, start, end)
        case 'right':
            return formatCode(address.a, start, address.length)
        default:
            return address.a
    }
}
