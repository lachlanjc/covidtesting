import { useState, useLayoutEffect } from 'react'
import { Box, Button, Text, Grid, Progress, useColorMode } from 'theme-ui'
import { map, max, orderBy, reverse, round, take } from 'lodash'
import Controls, { Control } from './controls'
import commaNumber from 'comma-number'

const cols = ['1fr 2fr 2fr 3fr', '2fr 1fr 1fr 5fr']

const TopStates = ({ data }) => {
  const [pc, setPC] = useState(false)
  const [positive, setPositive] = useState(false)
  const [reversed, setReversed] = useState(false)
  const [limit, setLimit] = useState(10)
  const [colorMode] = useColorMode()

  const dataKey = pc ? ['positivePC', 'totalPC'] : ['positive', 'total']
  const chooseDataKey = positive ? dataKey[0] : dataKey[1]
  const dataLabel = pc ? '/100k' : 'tests'
  const dataFunc = pc ? n => round(n, 1) : commaNumber

  let ranked = orderBy(data, dataKey[0])
  if (!reversed) ranked = reverse(ranked)
  const [largest, setLargest] = useState(max(map(data, chooseDataKey)))
  if (typeof document !== 'undefined') {
    useLayoutEffect(() => setLargest(max(map(data, chooseDataKey))))
  }

  return [
    <Controls
      as="aside"
      key="controls"
      sx={{
        flexWrap: 'wrap',
        'span + button': { mx: 2 },
        'button + button': { mr: 2 },
        'span, button': { mb: 3 },
        mb: 3
      }}
    >
      <span>Show</span>
      <Control on={!positive} set={setPositive} label="All" />
      <Control on={positive} set={setPositive} label="Positive" />
      <span>tests sorted by the</span>
      <Control on={!reversed} set={setReversed} label="Most" color="green" />
      <Control on={reversed} set={setReversed} label="Least" color="green" />
      <Control on={!pc} set={setPC} label="In total" color="blue" />
      <Control on={pc} set={setPC} label="Per capita" color="blue" />
    </Controls>,
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
                value={state[chooseDataKey] / state[dataKey[1]]}
                sx={{
                  height: 8,
                  bg: colorMode === 'dark' ? 'slate' : 'sunken',
                  minWidth: 12
                }}
                style={{ width: `${(state[chooseDataKey] / largest) * 100}%` }}
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
