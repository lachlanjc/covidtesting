import { Box, Text, Grid, Progress, useColorMode } from 'theme-ui'
import { map, max, orderBy, reverse, take } from 'lodash'
import commaNumber from 'comma-number'

const TopStates = ({ data }) => {
  const [colorMode] = useColorMode()
  const ranked = take(reverse(orderBy(data, 'positive')), 10)
  const largest = max(map(data, 'total'))
  const cols = ['1fr 2fr 2fr 3fr', '2fr 1fr 1fr 5fr']
  return (
    <Box as="table">
      <Grid
        as="thead"
        gap={[3, 4]}
        columns={cols}
        sx={{
          alignItems: 'end',
          fontFamily: 'heading',
          lineHeight: 'title',
          textAlign: 'right',
          mb: 2
        }}
      >
        <th></th>
        <Text as="th" sx={{ color: 'red' }}>
          Positive tests
        </Text>
        <Text as="th" sx={{ color: 'muted' }}>
          Total tests
        </Text>
        <th></th>
      </Grid>
      {ranked.map(state => (
        <Grid
          key={state.id}
          as="tr"
          gap={[3, 4]}
          columns={cols}
          sx={{ alignItems: 'center', textAlign: 'right', mb: 1 }}
        >
          <Text as="tc" sx={{ fontFamily: 'heading' }}>
            <Text as="span" sx={{ display: ['block', 'none'] }}>
              {state.id}
            </Text>
            <Text as="span" sx={{ display: ['none', 'block'] }}>
              {state.name}
            </Text>
          </Text>
          <Text as="tc" sx={{ color: 'red' }}>
            {commaNumber(state.positive)}
          </Text>
          <Text as="tc" sx={{ color: 'muted' }}>
            {commaNumber(state.total)}
          </Text>
          <tc>
            <Progress
              max={1}
              value={state.positive / state.total}
              sx={{
                height: 8,
                bg: colorMode === 'dark' ? 'slate' : 'sunken',
                minWidth: 12
              }}
              style={{ width: `${(state.total / largest) * 100}%` }}
            />
          </tc>
        </Grid>
      ))}
    </Box>
  )
}

export default TopStates
