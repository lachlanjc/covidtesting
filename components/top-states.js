import { useState, useLayoutEffect } from 'react'
import { Box, Button, Text, Grid, Progress, useColorMode } from 'theme-ui'
import { map, max, orderBy, reverse, round, take } from 'lodash'
import Controls from './controls'
import commaNumber from 'comma-number'

const cols = ['1fr 2fr 2fr 3fr', '2fr 1fr 1fr 5fr']

const TopStates = ({ data }) => {
  const [pc, setPC] = useState(false)
  const [limit, setLimit] = useState(10)
  const [colorMode] = useColorMode()

  const dataKey = pc ? ['positivePC', 'totalPC'] : ['positive', 'total']
  const dataLabel = pc ? '/100k' : 'tests'
  const dataFunc = pc ? n => round(n, 1) : commaNumber

  const ranked = reverse(orderBy(data, dataKey[0]))
  const [largest, setLargest] = useState(max(map(data, dataKey[1])))
  useLayoutEffect(() => setLargest(max(map(data, dataKey[1]))))

  return [
    <Controls key="controls" sx={{ mb: 3 }}>
      Show
      <Button
        variant={!pc ? 'primary' : 'outline'}
        onClick={() => setPC(false)}
      >
        All
      </Button>
      <Button variant={pc ? 'primary' : 'outline'} onClick={() => setPC(true)}>
        Per capita
      </Button>
      tests
    </Controls>,
    <Box as="table" key="table">
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
          Positive {dataLabel}
        </Text>
        <Text as="th" sx={{ color: 'muted' }}>
          Total {dataLabel}
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
            {dataFunc(state[dataKey[0]])}
          </Text>
          <Text as="tc" sx={{ color: 'muted' }}>
            {dataFunc(state[dataKey[1]])}
          </Text>
          <tc>
            <Progress
              max={1}
              value={state[dataKey[0]] / state[dataKey[1]]}
              sx={{
                height: 8,
                bg: colorMode === 'dark' ? 'slate' : 'sunken',
                minWidth: 12
              }}
              style={{ width: `${(state[dataKey[1]] / largest) * 100}%` }}
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
  ]
}

export default TopStates
