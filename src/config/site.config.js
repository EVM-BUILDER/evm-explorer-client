import getNextConfig from 'next/config'
const { publicRuntimeConfig } = getNextConfig()

export const isServer = typeof window === 'undefined'

export function getEnv(key) {
    return publicRuntimeConfig[key]
}

export const ENV = getEnv('ENV')
export const isDev = getEnv('ENV') === 'local' || getEnv('ENV') === 'development'

// ======================= ENV ===========================
const siteConfig = {
    apiUrl: process.env.NEXT_PUBLIC_ROOT_API, // 'https://pscscan-testnet.evmbuilder.com/api/v1'
    defaultSettingsUrl: process.env.NEXT_PUBLIC_DEFAULT_SETTING_API,
}

export default siteConfig
