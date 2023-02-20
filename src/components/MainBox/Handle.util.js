export const getMarketCap = (mc) => {
    if (!mc) return 0
    return mc.toFixed(2)
}
export const getTokenBalanceFromMCAndPrice = (mc, price) => {
    if (!mc || !price) return 0
    return (mc / price).toFixed()
}
