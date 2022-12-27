const path = require('path')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([])
const withOptimizedImages = require('next-optimized-images')
const withFonts = require('next-fonts')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const ENV = process.env.APP_ENV || 'local'
const dotEnvResult = require('dotenv').config({ path: `./bin/${ENV}.env` })
if (dotEnvResult.error) {
  console.error(dotEnvResult.error)
  process.exit(1)
}

// next.js custom configuration goes here
const nextConfig = {
  env: {
    BACKEND_URL: 'https://localhost:8080',
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // custom here
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // process.env.NEXT_PUBLIC_APP_URL
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  webpack5: false,
  publicRuntimeConfig: Object.assign(dotEnvResult.parsed || {}, { ENV }),
}

// fix: prevents error when .css files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.css'] = file => {};
// }

module.exports = withPlugins(
  [
    withTM,
    withOptimizedImages,
    withFonts,
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
          },
        },
      },
    ],
  ],
  nextConfig,
)
