import Meta from '../components/meta'
import Header from '../components/header'
import StateGraphic from '../components/states-graphic'
import StateList from '../components/state-list'
import {
  Badge,
  Box,
  Container,
  Heading,
  Link,
  Text,
  useColorMode
} from 'theme-ui'
import { getJSON } from '../lib/util'
import loadJSON from 'load-json-file'
import { find, map, pick } from 'lodash'

export default ({ data = [], states = [] }) => {
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
          across the country, so we can’t know how many cases there are. This
          site shows the number of tests each state has performed relative to
          their populations.
        </Text>
        <Text sx={{ color: 'secondary', mt: 3 }}>
          All data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          .
        </Text>
      </Header>
      <Container sx={{ my: [-2, null, -4, -5], fontFamily: 'heading' }}>
        <StateGraphic data={data} states={states} colorRange={colorRange} />
      </Container>
      <Container
        sx={{ maxWidth: [null, null, 'copyPlus'], pt: [3, 4], pb: [4, 5] }}
      >
        <Heading as="h2" variant="headline">
          Jump to a state
        </Heading>
        <StateList />
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
