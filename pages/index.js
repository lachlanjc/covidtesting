import { useState, useEffect } from 'react'
import Meta from '../components/meta'
import Header from '../components/header'
import Controls, { Control } from '../components/controls'
import StateGraphic from '../components/states-graphic'
import Stat from '../components/stat'
import TopStates from '../components/top-states'
import StateList from '../components/state-list'
import Readings from '../components/readings'
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  useColorMode
} from 'theme-ui'
import commaNumber from 'comma-number'
import { getJSON } from '../lib/util'
import { find, map, pick, min, max, round, orderBy, last } from 'lodash'

const dateToday = (today = '20200506') =>
  `${today.substring(4, 6).replace(/^0/, '')}/${today.substring(6, 8)}`

// prettier-ignore
const getColorRange = dark =>
  dark
    ? [ '#5e240d', '#6a290d', '#752f0d', '#7c3803', '#7e4e00', '#7e5c00',
        '#7f6a00', '#7f7500', '#7d7f00', '#6f7f00', '#6a8000' ]
    : [ '#b56c50', '#cd6644', '#e55934', '#f06529', '#f28b22', '#f2af23',
        '#f2d323', '#f1e825', '#e5f127', '#d5f028', '#cff02b' ]
// http://www.colorbox.io/#steps=8#hue_start=17#hue_end=70#hue_curve=easeInOutSine#sat_start=28#sat_end=41#sat_curve=easeOutCubic#sat_rate=200#lum_start=71#lum_end=94#lum_curve=easeInExpo#lock_hex=e55934#minor_steps_map=0,30,40

const Swatch = ({ bg, value, label }) => (
  <>
    <Box
      sx={{ display: 'inline-block', p: 3, bg, borderRadius: 'default', mr: 2 }}
    />
    {value && (
      <Box sx={{ lineHeight: 'title', mr: 4 }}>
        <Text as="span" sx={{ color: 'text', display: 'block' }}>
          {round(value)}/100k
        </Text>
        <Text as="span" sx={{ color: 'muted', fontSize: 0 }}>
          {label}
        </Text>
      </Box>
    )}
  </>
)

const Legend = ({ colorRange, total }) => (
  <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
    <Swatch bg={colorRange[0]} value={min(total)} label="least" />
    <Swatch bg={colorRange[3]} />
    <Swatch bg={colorRange[5]} />
    <Swatch bg={colorRange[7]} />
    <Swatch bg={last(colorRange)} value={max(total)} label="most" />
  </Flex>
)

const testPop = today => round((today.total / 327200000) * 100, 3)
const Stats = ({ today }) => (
  <Grid columns={[2, 3]} sx={{ mb: [3, null, 4] }}>
    <Stat value={commaNumber(today.total)} label="Total U.S. tests" />
    <Stat value={testPop(today)} unit="%" label="Tests / U.S. population" />
    <Stat
      value={round((today.positive / today.total) * 100, 1)}
      unit="%"
      label="Tests are positive"
      sx={{ display: ['none !important', 'flex !important'] }}
    />
  </Grid>
)

export default ({ data = [], states = [], today = {} }) => {
  const [showValues, setShowValues] = useState(false)
  const [showPositives, setShowPositives] = useState(false)
  const [colorMode] = useColorMode()
  const colorRange = getColorRange(colorMode === 'dark')
  const dataKey = showPositives ? 'positivePC' : 'totalPC'
  const [total, setTotal] = useState(map(data, dataKey))
  useEffect(() => setTotal(map(data, dataKey)), [showPositives])
  return (
    <>
      <Meta />
      <Header
        title={
          <>
            The U.S. COVID-19{' '}
            <Badge
              as="strong"
              sx={{
                fontSize: 'inherit',
                borderRadius: 'default',
                bg: 'primary',
                px: 2,
                py: 1
              }}
            >
              Testing Gap
            </Badge>
          </>
        }
      >
        <Text sx={{ color: 'text', fontSize: [1, 2], my: [2, 3] }}>
          Critical lack of access to COVID-19 testing across the country
          prevents us from knowing exactly how many people are infected. This
          isn’t news.
        </Text>
        <Text sx={{ color: 'text', fontSize: [1, 2], my: [2, 3] }}>
          But depending on your state, you have very different access to
          testing. This site shows each state’s testing relative to their
          population.
        </Text>
	{/*
        <details>
          <Text as="summary" sx={{ fontFamily: 'heading' }}>
            Top takeaways
          </Text>
          <Card
            as="ol"
            variant="sunken"
            sx={{
              color: 'text',
              fontSize: [1],
              my: [2, 3],
              py: [2, 3],
              pl: [4, 4],
              mx: [-2, -3, -4],
              li: { maxWidth: 'copy' },
              'li + li': { mt: [1, 2] }
            }}
          >
            <Text as="li">
              Poorer states lack testing: nearly all Southern & Midwestern
              states have done &lt;75&nbsp;tests per 100K people, while
              Northeastern states range 120-400 tests per 100K.
            </Text>
            <Text as="li">
              Washington (443/100K) & New York (398/100K) have the most testing
              per capita, Ohio has the least (4/100K).
            </Text>
            <Text as="li">
              85% of tests in New Jersey return positive, vs 0.03% in West
              Virginia. This may be due to different requirements for testing.
            </Text>
            <Text as="li">
              No states have nearly enough testing yet—&lt;{testPop(today)}% of
              Americans have been tested once.
            </Text>
          </Card>
        </details>
	*/}
        <Text sx={{ color: 'secondary', mt: 3 }}>
          All data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          . Updated {dateToday(today.date.toString())}.
        </Text>
      </Header>
      <Heading
        as="h2"
        variant="headline"
        sx={{ textAlign: [null, 'center'], px: 3, mb: [3, 4] }}
      >
        Tests per capita
      </Heading>
      <Container
        sx={{
          display: 'flex',
          flexDirection: ['column-reverse', 'column'],
          '.rsm-geographies': {
            fontFamily: 'heading',
            transform: theme => `translateY(-${theme.space[4]}px)`
          }
        }}
      >
        <Grid as="aside" columns={[null, null, 'repeat(3, auto)']} gap={3}>
          <Controls>
            Show
            <Control on={!showPositives} set={setShowPositives} label="All" />
            <Control
              on={showPositives}
              set={setShowPositives}
              label="Positive"
            />
            tests
          </Controls>
          <Legend colorRange={colorRange} total={total} />
          <Controls sx={{ gridRow: [2, 'unset'] }}>
            Show
            <Control on={!showValues} set={setShowValues} label="States" />
            <Control on={showValues} set={setShowValues} label="Values" />
            on map
          </Controls>
        </Grid>
        <StateGraphic
          data={data}
          states={states}
          colorRange={colorRange}
          showValues={showValues}
          dataKey={dataKey}
        />
      </Container>
      <Container variant="copy" sx={{ pt: [3, 0], pb: [4, 5] }}>
        <Stats today={today} />
        <Heading as="h2" variant="headline">
          Top states
        </Heading>
        <TopStates data={data} />
        <Heading as="h2" variant="headline">
          See full state details
        </Heading>
        <StateList />
        <Heading as="h2" variant="headline" sx={{ mt: 4 }}>
          Relevant links
        </Heading>
        <Readings />
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const loadJSON = require('load-json-file')
  let states = await loadJSON('./public/states-full.json')
  states = states.map(state => pick(state, ['code', 'state', 'population']))
  let data = await getJSON('https://covidtracking.com/api/states')
  const continental = map(states, 'code')
  data = data.filter(({ state }) => continental.includes(state))
  data = data.map(state => ({
    name: find(states, ['code', state.state]).state,
    pop: find(states, ['code', state.state]).population,
    ...state
  }))
  data = data.map(({ state, name, positive, total, pop }) => ({
    id: state,
    name,
    pop,
    positive,
    total,
    totalPC: total / (pop / 100000),
    positivePC: positive / (pop / 100000)
  }))
  let daily = await getJSON('https://covidtracking.com/api/us/daily')
  daily = orderBy(daily, 'date')
  const today = last(daily)
  return { props: { data, states, today }, unstable_revalidate: 4 }
}
