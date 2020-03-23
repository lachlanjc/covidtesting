import { Button, Flex } from 'theme-ui'
import { merge } from 'lodash'

export const Control = ({ on, set, label, color = 'primary', ...props }) => (
  <Button
    variant={on ? 'primary' : 'outline'}
    onClick={() => set(v => !v)}
    children={label}
    sx={on ? { bg: color, color: 'white' } : { color }}
    {...props}
  />
)

const Controls = props => (
  <Flex
    {...props}
    sx={merge(
      {
        alignItems: 'center',
        button: {
          px: 2,
          py: 0,
          textTransform: 'lowercase',
          ':first-of-type': { mx: 2 },
          ':last-of-type': { mr: 2 }
        }
      },
      props.sx
    )}
  />
)

export default Controls
