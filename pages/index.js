import Meta from '../components/meta'
import Header from '../components/header'
import StateList from '../components/state-list'
import { Container, Heading, Text, Link } from 'theme-ui'
// import { getJSON } from '../lib/util'

export default ({ data = [], states = [] }) => {
  return (
    <>
      <Meta />
      <Header
        title="U.S. COVID-19 Testing"
        desc="Across the U.S., inadequate COVID-19 testing is hampering our response to the pandemic."
      >
        <Text sx={{ color: 'secondary', mt: 3 }}>
          All data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          .
        </Text>
      </Header>
      <Container sx={{ maxWidth: [null, null, 'copyPlus'], py: [4, 5] }}>
        <Heading as="h2" variant="headline">
          Jump to a state
        </Heading>
        <StateList />
      </Container>
    </>
  )
}

// export const getServerSideProps = async () => {
//   const data = await getJSON('https://covidtracking.com/api/states')
//   return { props: { data } }
// }
