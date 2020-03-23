import { useState } from 'react'
import { Box, Button, Text, Grid, Progress, useColorMode } from 'theme-ui'
import { map, max, orderBy, reverse, take } from 'lodash'
import commaNumber from 'comma-number'

const TopStates = ({ data }) => {
  const [limit, setLimit] = useState(10)
  const [colorMode] = useColorMode()
  const ranked = reverse(orderBy(data, 'positive'))
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
      {take(ranked, limit).map(state => (
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
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="outline"
          sx={{ py: 1, px: 2 }}
          onClick={() => setLimit(l => (l === 10 ? data.length : 10))}
        >
          {limit === 10 ? 'Show all states' : 'Hide states'}
        </Button>
      </Box>
    </Box>
  )
}

export default TopStates
