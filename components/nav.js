import {
  Box,
  Container,
  IconButton,
  Text,
  NavLink,
  useColorMode
} from 'theme-ui'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Moon } from 'react-feather'

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

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <IconButton
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
        borderRadius: 9999,
        transition: 'box-shadow .125s ease-in-out',
        ...props.sx,
        ':hover,:focus': {
          color: 'accent',
          boxShadow: '0 0 0 3px',
          outline: 'none'
        }
      }}
    >
      <Moon size={24} />
    </IconButton>
  )
}

export default ({ material = false }) => {
  const [mode] = useColorMode()
  const Background = material ? Material : Box
  return (
    <Background
      as="nav"
      colorMode={mode}
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'smoke',
        color: 'nav',
        py: 3
      }}
      key="nav"
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontWeight: '400',
            fontSize: 1,
            color: mode === 'dark' ? 'red' : 'text',
            textDecoration: 'none',
            mr: [3, 4],
            ':focus,:hover': { color: mode === 'dark' ? 'orange' : 'red' }
          }
        }}
      >
        <Link href="/" passHref>
          <Text
            as="a"
            sx={{ color: 'red', flex: '1 1 auto', fontFamily: 'heading' }}
          >
            COVID-19 Testing
          </Text>
        </Link>
        <NavLink href="https://predictcovid.com">Predict</NavLink>
        <Link href="/about" passHref>
          <NavLink>About</NavLink>
        </Link>
        <ColorSwitcher />
      </Container>
    </Background>
  )
}
