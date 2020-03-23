import { Flex } from 'theme-ui'

const Controls = props => (
  <Flex
    {...props}
    sx={{
      alignItems: 'center',
      button: {
        px: 2,
        py: 0,
        ':first-of-type': { mx: 2 },
        ':last-of-type': { mr: 2 }
      },
      ...props.sx
    }}
  />
)

export default Controls
