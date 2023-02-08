export default function parseSettingsData(settings = {}) {
    return Object.entries(settings).reduce((memo, [_, item]) => {
        memo[item.key] = item?.value
        return memo
    }, {})
}
