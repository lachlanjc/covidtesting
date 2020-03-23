import { useState, useLayoutEffect } from 'react'
import { Box, Button, Text, Grid, Progress, useColorMode } from 'theme-ui'
import { map, max, orderBy, reverse, round, take } from 'lodash'
import Controls from './controls'
import commaNumber from 'comma-number'

const cols = ['1fr 2fr 2fr 3fr', '2fr 1fr 1fr 5fr']

const TopStates = ({ data }) => {
  const [pc, setPC] = useState(false)
  const [positive, setPositive] = useState(false)
  const [reversed, setReversed] = useState(false)
  const [limit, setLimit] = useState(10)
  const [colorMode] = useColorMode()

  let dataKey = pc ? ['positivePC', 'totalPC'] : ['positive', 'total']
  if (positive) dataKey = reverse(dataKey)
  const dataLabel = pc ? '/100k' : 'tests'
  const dataFunc = pc ? n => round(n, 1) : commaNumber

  let ranked = orderBy(data, dataKey[0])
  if (!reversed) ranked = reverse(ranked)
  const [largest, setLargest] = useState(max(map(data, dataKey[1])))
  useLayoutEffect(() => setLargest(max(map(data, dataKey[1]))))

  return [
    <Grid columns={[null, 2]} gap={2} as="aside" key="controls" sx={{ mb: 3 }}>
      <Controls>
        Show
        <Button
          variant={!pc ? 'primary' : 'outline'}
          onClick={() => setPC(false)}
        >
          All
        </Button>
        <Button
          variant={pc ? 'primary' : 'outline'}
          onClick={() => setPC(true)}
        >
          Per capita
        </Button>
        tests
      </Controls>
      <Controls>
        Sort by most
        <Button
          variant={!positive ? 'primary' : 'outline'}
          onClick={() => setPositive(false)}
        >
          Total
        </Button>
        <Button
          variant={positive ? 'primary' : 'outline'}
          onClick={() => setPositive(true)}
        >
          Positive
        </Button>
        tests
      </Controls>
      <Controls>
        Sort by
        <Button
          variant={!reversed ? 'primary' : 'outline'}
          onClick={() => setReversed(false)}
        >
          Most
        </Button>
        <Button
          variant={reversed ? 'primary' : 'outline'}
          onClick={() => setReversed(true)}
        >
          Least
        </Button>
        testing
      </Controls>
    </Grid>,
    <Box as="table" key="table">
      <thead>
        <Grid
          as="tr"
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
          <Text as="th" sx={{ opacity: 0 }}>
            State
          </Text>
          <Text as="th" sx={{ color: 'text' }}>
            Total {dataLabel}
          </Text>
          <Text as="th" sx={{ color: 'red' }}>
            Positive {dataLabel}
          </Text>
          <th></th>
        </Grid>
      </thead>
      <tbody>
        {take(ranked, limit).map(state => (
          <Grid
            key={state.id}
            as="tr"
            gap={[3, 4]}
            columns={cols}
            sx={{ alignItems: 'center', textAlign: 'right', mb: 1 }}
          >
            <Text as="td" sx={{ fontFamily: 'heading' }}>
              <Text as="span" sx={{ display: ['block', 'none'] }}>
                {state.id}
              </Text>
              <Text as="span" sx={{ display: ['none', 'block'] }}>
                {state.name}
              </Text>
            </Text>
            <Text as="td" sx={{ color: 'text' }}>
              {dataFunc(state[dataKey[1]])}
            </Text>
            <Text as="td" sx={{ color: 'red' }}>
              {dataFunc(state[dataKey[0]])}
            </Text>
            <td>
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
            </td>
          </Grid>
        ))}
      </tbody>
    </Box>,
    <Box key="button" sx={{ textAlign: 'center', mt: 3 }}>
      <Button
        variant="outline"
        sx={{ py: 1, px: 2 }}
        onClick={() => setLimit(l => (l === 10 ? data.length : 10))}
      >
        {limit === 10 ? 'Show all states' : 'Hide states'}
      </Button>
    </Box>
  ]
}

export default TopStates
