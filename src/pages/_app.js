import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import withReduxSaga from 'next-redux-saga'
import Script from 'next/script'
import Head from 'next/head'
import TimeAgo from 'javascript-time-ago'
import { IntlProvider } from 'react-intl'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'
import { Web3ReactProvider } from '@web3-react/core'

import 'antd/dist/antd.css'
import 'assets/css/global.scss'
import 'styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

import { isLogin } from 'utils/auth'
import { getLibrary } from 'utils/web3React'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import PublicLayout from 'layouts/PublicLayout'
import { ThemeContextProvider } from 'containers/ThemeContext'
import { wrapper } from 'redux/store'
import { languages } from 'config/language/config'
import { useLanguage } from 'redux/language/hooks'
import { getDefaultSettings, getSettings } from 'services/api/settings'
import { getSettingsSuccess } from 'redux/settings/actions'
import getRootStyle from 'utils/getRootStyle'
import { getRootMetaTitle, parseSettingsData } from 'utils/settings'
import defaultSettings from './settings.json'
import useFetchPulsePrice from 'redux/statistics/hooks/useFetchPulsePrice'
import { useRouter } from 'next/router'
import { getProfile } from 'redux/user/actions'
import { CenterStyle } from 'styles'

TimeAgo.addLocale({
    locale: 'en',
    long: {
        second: {
            past: {
                one: '{0}s ago',
                other: '{0}s ago',
            },
            future: {
                one: 'in {0}s',
                other: 'in {0}s',
            },
        },
        minute: {
            past: {
                one: '{0}m ago',
                other: '{0}m ago',
            },
            future: {
                one: 'in {0}m',
                other: 'in {0}m',
            },
        },
        hour: {
            past: {
                one: '{0}h ago',
                other: '{0}h ago',
            },
            future: {
                one: 'in {0}h',
                other: 'in {0}h',
            },
        },
        day: {
            past: {
                one: '{0} day ago',
                other: '{0} days ago',
            },
            future: {
                one: 'in {0} day',
                other: 'in {0} days',
            },
        },
    },
})
TimeAgo.addLocale({
    locale: 'ru',
    long: {
        second: {
            past: {
                one: '{0}s назад',
                other: '{0}s назад',
            },
            future: {
                one: 'в {0}s',
                other: 'в {0}s',
            },
        },
        minute: {
            past: {
                one: '{0}m назад',
                other: '{0}m назад',
            },
            future: {
                one: 'в {0}m',
                other: 'в {0}m',
            },
        },
        hour: {
            past: {
                one: '{0}h назад',
                other: '{0}h назад',
            },
            future: {
                one: 'в {0}h',
                other: 'в {0}h',
            },
        },
        day: {
            past: {
                one: '{0} day ago',
                other: '{0} days ago',
            },
            future: {
                one: 'in {0} day',
                other: 'in {0} days',
            },
        },
    },
})

Date.prototype.addDays = (date, days) => {
    const pDate = new Date(date || new Date())
    pDate.setDate(pDate.getDate() + days)
    return pDate
}

const MyApp = (props) => {
    const { Component, ...rest } = props
    const { store } = wrapper.useWrappedStore(rest)
    const metaTitle = getRootMetaTitle(rest.globalProps?.settings)
    const rootStyle = getRootStyle(rest.globalProps?.settings)
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover"
                />
                <link rel="icon" href={metaTitle.favicon} type="image/png" sizes="16x16" />
                <meta name="theme-color" content="#1FC7D4" />
                <meta name="twitter:image" content={metaTitle.graphicimg} />
                <meta name="twitter:description" content={metaTitle.sitedescription} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle.sitename} />
                <meta name="description" content={metaTitle.sitedescription} />
                <title>{metaTitle.sitename}</title>
            </Head>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Provider store={store}>
                    <style jsx global>
                        {rootStyle}
                    </style>{' '}
                    <SWRConfig
                        value={{
                            use: [fetchStatusMiddleware],
                        }}
                    >
                        <App {...props} />
                    </SWRConfig>
                </Provider>
            </Web3ReactProvider>

            <Script
                strategy="afterInteractive"
                id="google-tag"
                dangerouslySetInnerHTML={{
                    __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${metaTitle.ggtag}');
      `,
                }}
            />
        </>
    )
}

MyApp.getInitialProps = async () => {
    let settings
    try {
        const response = await getSettings()
        if (response && response?.data?.length > 0) {
            settings = parseSettingsData(response.data)
        }
    } catch (error) {
        settings = defaultSettings
    }

    if (!settings) {
        settings = defaultSettings
        // const res = await getDefaultSettings()
        // if (res.data) {
        //     settings = parseSettingsData(res.data)
        // }
    }

    if (settings) {
        // config add chain to metamask
        const chain = settings ? settings.chain : {}
        const addToMetamask = [
            {
                chainId: `0x${(+chain.id).toString(16)}`, // `0x76B9`,
                chainName: chain.name,
                nativeCurrency: {
                    name: chain.native.name,
                    symbol: chain.native.symbol,
                    decimals: chain.native.decimals,
                },
                rpcUrls: [chain.rpc],
                blockExplorerUrls: [chain.explorer],
            },
        ]

        return {
            globalProps: {
                settings: { ...settings, addToMetamask },
            },
        }
    }
    return {
        globalProps: {},
    }
}

function GlobalHooks() {
    useFetchPulsePrice()
    return null
}

const isUserLogin = isLogin()

function App({ Component, globalProps, pageProps }) {
    // Use the layout defined at the page level, if available
    const Layout = Component.Layout || PublicLayout

    const { language } = useLanguage()

    const router = useRouter()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.User)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (router?.pathname?.includes('/admin') && userInfo?.role !== 'admin') {
            router.push(`/`)
        } else {
            setLoading(false)
        }
    }, [router?.pathname])

    useEffect(() => {
        dispatch(getSettingsSuccess(globalProps?.settings))
    }, [dispatch, globalProps])

    useEffect(() => {
        if (isUserLogin) {
            dispatch(getProfile())
        }
    }, [dispatch])

    if (!globalProps?.settings) {
        return <CenterStyle>Fail to fetching data.</CenterStyle>
    }
    if (Component.pure) {
        return <Component {...pageProps} />
    }
    return (
        <>
            <ToastContainer position="top-center" />
            <IntlProvider locale={language} messages={languages[language]}>
                <GlobalHooks />
                <ThemeContextProvider>
                    {!loading && (
                        <Layout>
                            <Component {...pageProps} {...globalProps} />
                        </Layout>
                    )}
                </ThemeContextProvider>
            </IntlProvider>
        </>
    )
}

export default withReduxSaga(MyApp)
