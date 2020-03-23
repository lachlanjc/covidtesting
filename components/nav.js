import {
  Box,
  Container,
  IconButton,
  Text,
  NavLink,
  useColorMode
} from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { ArrowLeft, ExternalLink, Moon } from 'react-feather'

const Material = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  ${props =>
    props.colorMode === 'dark'
      ? `
         background-color: rgba(0, 0, 0, 0.875);
         @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
           background-color: rgba(0, 0, 0, 0.75);
           -webkit-backdrop-filter: saturate(180%) blur(8px);
         }
         `
      : `
           background-color: rgba(255, 255, 255, 0.98);
           @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
             background-color: rgba(255, 255, 255, 0.75);
             -webkit-backdrop-filter: saturate(180%) blur(8px);
           }
         `};
  @media (prefers-reduced-transparency: reduce) {
    -webkit-backdrop-filter: auto !important;
  }
`

const linkEffect = {
  borderRadius: 'circle',
  transition: 'box-shadow .125s ease-in-out',
  ':hover,:focus': {
    boxShadow: '0 0 0 2px',
    outline: 'none'
  }
}

const NavButton = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      ...linkEffect,
      display: 'inline-flex',
      alignItems: 'flex-end',
      width: 'auto',
      ...sx
    }}
  />
)

const BackButton = ({ to = '/', text = 'Back' }) => (
  <Link href={to} passHref>
    <NavButton
      as="a"
      title={to === '/' ? 'Back to homepage' : 'Back'}
      sx={{ color: 'primary', pr: 2, svg: { mr: 2 } }}
    >
      <ArrowLeft />
      {text}
    </NavButton>
  </Link>
)

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      {...props}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{ color: 'secondary' }}
      title="Reverse color scheme"
    >
      <Moon size={24} />
    </NavButton>
  )
}

export default ({ material = false }) => {
  const [mode] = useColorMode()
  const Background = material ? Material : Box
  const { pathname } = useRouter()
  const back = pathname !== '/'
  return (
    <Background as="nav" colorMode={mode} sx={{ bg: 'sheet', py: 3 }} key="nav">
      <Container
        sx={{
          maxWidth: [null, null, 'copyPlus'],
          display: 'flex',
          alignItems: 'center',
          a: {
            fontFamily: 'heading',
            fontSize: 1,
            color: mode === 'dark' ? 'primary' : 'text',
            textDecoration: 'none',
            mr: [3, 4],
            ':focus,:hover': { color: mode === 'dark' ? 'orange' : 'red' },
            ':first-of-type': { color: 'primary' }
          }
        }}
      >
        {back ? (
          <BackButton text="All States" />
        ) : (
          <Link href="/" passHref>
            <Text
              as="a"
              sx={{ color: 'red', flex: '1 1 auto', fontFamily: 'heading' }}
            >
              COVID-19 Testing
            </Text>
          </Link>
        )}
        <NavLink
          href="https://predictcovid.com"
          sx={{ ...linkEffect, px: 2, py: 1, ml: 'auto' }}
        >
          Predict Cases
        </NavLink>
        <ColorSwitcher />
      </Container>
    </Background>
  )
}
