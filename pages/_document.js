import Document, { Head, Main, NextScript } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="https://predictcovid.com/fonts.css" />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
