import * as React from 'react'
import NextApp from 'next/app'

import { ThemeProvider } from 'theme-ui'
import theme from '../lib/theme'
import NProgress from '../components/nprogress'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <NProgress color={theme.colors.primary} />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
