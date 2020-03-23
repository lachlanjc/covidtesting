import { useState } from 'react'
import Meta from '../components/meta'
import Header from '../components/header'
import StateGraphic from '../components/states-graphic'
import StateList from '../components/state-list'
import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Label,
  Link,
  Text,
  useColorMode
} from 'theme-ui'
import { getJSON } from '../lib/util'
import loadJSON from 'load-json-file'
import { find, map, pick, min, max, round, last } from 'lodash'
import { Twitter, BarChart2, Bookmark, MapPin } from 'react-feather'

// prettier-ignore
const getColorRange = dark =>
  dark
    ? [ '#5e240d', '#6a290d', '#752f0d', '#7c3803', '#7e4e00', '#7e5c00',
        '#7f6a00', '#7f7500', '#7d7f00', '#6f7f00', '#6a8000' ]
    : [ '#b56c50', '#cd6644', '#e55934', '#f06529', '#f28b22', '#f2af23',
        '#f2d323', '#f1e825', '#e5f127', '#d5f028', '#cff02b' ]

const Swatch = ({ bg, value }) => (
  <>
    <Box
      sx={{ display: 'inline-block', p: 3, bg, borderRadius: 'default', mr: 2 }}
    />
    {value && (
      <Text as="span" sx={{ color: 'text', mr: 4 }}>
        {round(value)}/100K
      </Text>
    )}
  </>
)

const Reading = props => (
  <Link
    target="_blank"
    rel="nofollow"
    sx={{
      bg: 'blue',
      color: 'white',
      py: 2,
      px: 3,
      borderRadius: 'default',
      lineHeight: 1.75,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      transition: '0.125s ease-in-out transform',
      ':hover,:focus': { transform: 'scale(1.0625)' },
      svg: { mr: 2 }
    }}
    {...props}
  />
)

export default ({ data = [], states = [] }) => {
  const [colorMode] = useColorMode()
  const colorRange = getColorRange(colorMode === 'dark')
  const total = map(data, 'totalPC')
  const [showValues, setShowValues] = useState(false)
  return (
    <>
      <Meta />
      <Header title="U.S. COVID-19 Testing">
        <Text sx={{ color: 'text', fontSize: [1, 2], my: [2, 3] }}>
          There’s a{' '}
          <Badge
            as="strong"
            sx={{ fontSize: 'inherit', fontFamily: 'heading', bg: 'primary' }}
          >
            critical shortage of testing
          </Badge>{' '}
          across the country, so we can’t know how many cases states have. This
          site shows the number of tests each state has performed relative to
          their population.
        </Text>
        <Text sx={{ color: 'secondary', mt: 3 }}>
          All data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          .
        </Text>
      </Header>
      <Container sx={{ maxWidth: [null, null, 'copyPlus'] }}>
        <Heading as="h2" variant="headline">
          Tests per capita
        </Heading>
        <Grid columns={[null, null, 2]} gap={3}>
          <Flex sx={{ alignItems: 'center' }}>
            <Swatch bg={colorRange[0]} value={min(total)} />
            <Swatch bg={colorRange[3]} />
            <Swatch bg={colorRange[5]} />
            <Swatch bg={colorRange[7]} />
            <Swatch bg={last(colorRange)} value={max(total)} />
          </Flex>
          <Label
            sx={{
              display: 'flex',
              alignItems: 'center',
              input: { flexShrink: 'none', mr: 2 }
            }}
          >
            <input
              type="checkbox"
              name="showValues"
              checked={showValues}
              onChange={e => setShowValues(e.target.checked)}
            />
            Show values on map
          </Label>
        </Grid>
      </Container>
      <Container sx={{ fontFamily: 'heading' }}>
        <StateGraphic
          data={data}
          states={states}
          colorRange={colorRange}
          showValues={showValues}
        />
      </Container>
      <Container
        sx={{ maxWidth: [null, null, 'copyPlus'], pt: [3, 4], pb: [4, 5] }}
      >
        <Heading as="h2" variant="headline">
          See full state details
        </Heading>
        <StateList />
        <Heading as="h2" variant="headline" sx={{ mt: 4 }}>
          Relevant links
        </Heading>
        <Grid columns={[null, 2]} gap={3}>
          <Reading href="https://covidtracking.com/about-tracker/">
            <Bookmark />
            About the data
          </Reading>
          <Reading href="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html">
            <BarChart2 />
            NYTimes interactive on testing
          </Reading>
          <Reading href="https://twitter.com/NateSilver538/status/1240652999325818886">
            <Twitter />
            Nate Silver on testing
          </Reading>
          <Reading href="https://www.evive.care">
            <MapPin />
            Find testing near you
          </Reading>
        </Grid>
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
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
  data = data.map(({ name, positive, total, pop }) => ({
    name,
    pop,
    positive,
    total,
    totalPC: total / (pop / 100000),
    positivePC: positive / (pop / 100000)
  }))
  return { props: { data, states } }
}
