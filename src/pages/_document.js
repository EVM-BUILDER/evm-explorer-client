import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

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

        return (
            <Html>
                <Head>
                    {settings && <link rel="icon" href="/favicon.ico" type="image/png" sizes="16x16" />}
                    <link
                        href={
                            settings?.ggfont ||
                            'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=optional'
                        }
                        rel="stylesheet"
                        async
                    />
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
