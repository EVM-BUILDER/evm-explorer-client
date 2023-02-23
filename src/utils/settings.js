export function parseSettingsData(settings = {}) {
    return Object.entries(settings).reduce((memo, [_, item]) => {
        memo[item.key] = item?.value
        return memo
    }, {})
}

export function getRootMetaTitle(settings = {}) {
    try {
        return settings
    } catch (error) {
        return {}
    }
}
