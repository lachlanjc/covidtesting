import { Box, Text, Link } from 'theme-ui'

export default () => (
  <Box
    as="footer"
    sx={{
      bg: 'sunken',
      textAlign: 'center',
      px: 2,
      py: [3, 4],
      mt: [3, 4],
      a: { color: 'accent' }
    }}
  >
    <Text sx={{ mb: 3 }}>
      Site by <Link href="https://lachlanjc.me">@lachlanjc</Link>, 2020.
    </Text>
    <Text>
      <Link href="https://github.com/lachlanjc/covidtesting">
        Open source on GitHub
      </Link>
    </Text>
  </Box>
)
