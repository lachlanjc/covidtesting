import { Box, Donut, Flex, Text } from 'theme-ui'
import { isEmpty } from 'lodash'
import human from 'human-format'

export const StatGrid = ({ quad = false, ...props }) => (
  <Box
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: ['repeat(2, 1fr)', `repeat(${quad ? 4 : 2}, 1fr)`],
      gridGap: 3,
      alignItems: 'flex-end',
      textAlign: 'left',
      mt: [3, 4],
      mb: [3, 4],
      div: {
        gridColumn: quad ? 'span 2' : null
      },
      ...props.sx
    }}
  />
)

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
        flexDirection: unit === '%' ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'start',
        my: 2,
        position: 'relative'
      }}
    >
      {!isEmpty(unit) && (
        <Text
          as="sup"
          sx={{
            fontSize: lg ? [2, 3] : [1, 2],
            color: color === 'text' ? 'secondary' : color,
            position: [null, null, unit === '%' ? null : 'absolute'],
            left: [null, null, -3],
            ml: [null, unit === '%' ? 1 : null],
            mr: [null, 1],
            pt: [null, 1]
          }}
          children={unit}
        />
      )}
      <Text
        as="span"
        sx={{
          color,
          fontSize: lg ? [4, 5] : 4,
          fontWeight: 'stat',
          letterSpacing: 'title',
          my: 0,
          width: '100%'
        }}
        children={typeof value === 'number' ? human(value) : value || '—'}
      />
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
      {unit === '%' && (
        <Donut
          value={value / 100}
          size={lg ? 48 : 32}
          strokeWidth={lg ? 3 : 2}
          sx={{ mr: 2, width: lg ? [32, 48] : 32, height: lg ? [32, 48] : 32 }}
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
