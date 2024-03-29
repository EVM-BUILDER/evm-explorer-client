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
    s3FileUrl: process.env.NEXT_PUBLIC_DEFAULT_S3_FILE_URL,
}

export default siteConfig
