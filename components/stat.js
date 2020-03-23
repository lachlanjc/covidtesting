import { Box, Flex, Text } from 'theme-ui'
import { isEmpty } from 'lodash'
import human from 'human-format'

export default ({
  value,
  label,
  unit = '',
  color = 'text',
  of,
  reversed = false,
  half = false,
  lg = false,
  ...props
}) => (
  <Flex
    {...props}
    sx={{
      fontFamily: 'heading',
      flexDirection: reversed ? 'column-reverse' : 'column',
      gridColumn: lg
        ? ['initial', 'span 1']
        : half
        ? 'span 1 !important'
        : 'initial',
      lineHeight: 1,
      ...props.sx
    }}
  >
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'start',
        my: 2,
        position: 'relative'
      }}
    >
      <Text
        as="span"
        sx={{
          color,
          fontSize: lg ? [4, 5] : 4,
          fontWeight: 'stat',
          letterSpacing: 'title',
          my: 0
        }}
        children={
          typeof value === 'number' && unit !== '%'
            ? human(value)
            : value || '—'
        }
      />
      {!isEmpty(unit) && (
        <Text
          as="sup"
          sx={{
            fontSize: lg ? [2, 3] : [1, 2],
            color: color === 'text' ? 'secondary' : color,
            ml: [null, unit === '%' ? 1 : null],
            mr: [null, 1],
            pt: [null, 1]
          }}
          children={unit}
        />
      )}
      {!isEmpty(of) && (
        <Text
          as="sup"
          sx={{
            fontSize: lg ? [2, 3] : [1, 2],
            color: 'muted',
            ml: [null, 1],
            pt: [null, 1],
            '::before': {
              content: '"/"'
            }
          }}
          children={of}
        />
      )}
    </Flex>
    {!isEmpty(label) && (
      <Text
        as="span"
        variant="caption"
        sx={{
          fontSize: half ? 0 : [0, 1],
          letterSpacing: 'headline',
          textTransform: 'uppercase'
        }}
        children={label}
      />
    )}
  </Flex>
)
