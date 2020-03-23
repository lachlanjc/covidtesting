import Meta from '../components/meta'
import Header from '../components/header'
import StateGraphic from '../components/states-graphic'
import StateList from '../components/state-list'
import { Container, Heading, Text, Link } from 'theme-ui'
import { getJSON } from '../lib/util'
import loadJSON from 'load-json-file'
import { find, map, pick } from 'lodash'

export default ({ data = [], states = [] }) => {
  return (
    <>
      <Meta />
      <Header
        title="U.S. COVID-19 Testing"
        desc="Across the country, inadequate COVID-19 testing is hampering our response to the pandemic."
      >
        <Text sx={{ color: 'secondary', mt: 3 }}>
          All data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          .
        </Text>
      </Header>
      <Container>
        <StateGraphic data={data} states={states} />
      </Container>
      <Container sx={{ maxWidth: [null, null, 'copyPlus'], py: [4, 5] }}>
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
