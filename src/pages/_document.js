import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { get } from 'lodash'

export default class CustomDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
    render() {
        const settings = this.props.__NEXT_DATA__.props.globalProps?.settings
        const rootScript = settings?.script
        const googleFontUrl = `https://fonts.googleapis.com/css?family=${get(
            settings,
            'appearance.typography.fontfamily',
            'Roboto',
        )}&display=swap`
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                    {/* <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3&family=Tektur&display=swap" rel="stylesheet" /> */}
                    <link href={googleFontUrl} rel="stylesheet" async />
                    {rootScript?.header && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: rootScript.header,
                            }}
                        />
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {rootScript?.body && (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: rootScript.body,
                            }}
                        />
                    )}
                </body>
                {rootScript?.footer && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: rootScript.footer,
                        }}
                    />
                )}
            </Html>
        )
    }
}
