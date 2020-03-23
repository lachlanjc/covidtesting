import base from '@hackclub/theme'
import { merge } from 'lodash'

const palette = {
  red: '#e55934',
  orange: '#fa7921',
  yellow: '#fde74c',
  green: '#9bc53d',
  blue: '#5a85ea'
}

const theme = base
theme.colors = merge(theme.colors, {
  ...palette,
  primary: palette.red,
  accent: palette.blue,
  modes: {
    dark: {
      accent: palette.blue
    }
  }
})

theme.buttons.primary = {
  ...theme.buttons.primary,
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'heading'
}
theme.text.headline.color = 'red'
theme.text.title.fontSize = [4, 5]
theme.text.subtitle.fontSize = 2
theme.text.subtitle = {
  ...theme.text.subtitle,
  fontFamily: 'body',
  fontWeight: '400',
  lineHeight: 'caption'
}
theme.forms.label.fontWeight = 'body'
theme.layout.copy.maxWidth = [null, null, 'copyPlus']

const fonts = `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Helvetica, sans-serif`
theme.fonts.heading = `'Gotham Rounded SSm A', 'Gotham Rounded SSm B', ${fonts}`
theme.fonts.body = `Sentinel, ${fonts}`

export default theme
