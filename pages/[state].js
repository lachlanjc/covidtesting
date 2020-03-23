import Header from '../components/header'
import Stat from '../components/stat'
import StateChart from '../components/state-chart'
import {
  BaseStyles,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  useColorMode
} from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { Twitter, Globe } from 'react-feather'
import { getJSON } from '../lib/util'
import loadJSON from 'load-json-file'
import Error from 'next/error'
import MD from 'react-markdown'
import { filter, find, orderBy, round } from 'lodash'

export default ({ errorCode, state, daily = [], latest = {}, info = {} }) => {
  if (errorCode) return <Error statusCode={errorCode} title="State not found" />
  const [colorMode] = useColorMode()
  const accessory = {
    bg: colorMode === 'dark' ? null : 'rgba(255, 255, 255, 0.75)',
    m: [1, 2, 3],
    textShadow: 'none'
  }
  return (
    <>
      <Header
        title={state.state}
        bgImg={state.landscape_background_url.replace('1280x720', '1920x1080')}
        sx={{ textAlign: 'center' }}
      >
        <Flex sx={{ mt: [3, 4], justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            as="a"
            href={
              info.covid19Site ||
              info.covid19SiteSecondary ||
              info.covid19SiteOld
            }
            variant="outline"
            sx={{ ...accessory, color: 'blue' }}
          >
            <Globe />
            State Health Site
          </Button>
          {info.twitter && (
            <Button
              as="a"
              href={`https://twitter.com/${info.twitter}`}
              variant="outline"
              sx={{ ...accessory, color: 'twitter' }}
            >
              <Twitter />
              State COVID Twitter
            </Button>
          )}
        </Flex>
      </Header>
      <Container as="article" sx={{ maxWidth: 'copyPlus', pb: [4, 5] }}>
        <Grid
          columns={[null, null, '3fr 2fr']}
          gap={[3, 4]}
          sx={{ mb: [4, 5], alignItems: 'end' }}
        >
          <div>
            <Heading variant="headline" as="h2">
              Tests reported
            </Heading>
            <Grid columns={3}>
              <Stat value={latest.total} label="Total tests reported" lg />
              <Stat
                value={round(latest.total / (state.population / 100000))}
                label="Tests/100K population"
                lg
              />
              <Stat
                value={round(latest.positive / (state.population / 100000))}
                label="Positive/100K population"
                lg
              />
              <Stat value={latest.positive} label="Positive" />
              <Stat value={latest.negative} label="Negative" />
              <Stat value={latest.pending} label="Pending" />
            </Grid>
          </div>
          <div>
            {info.notes && (
              <Card
                as={BaseStyles}
                variant="sunken"
                sx={{
                  padding: [3, 3],
                  textAlign: 'left',
                  maxHeight: '16em',
                  overflowY: 'auto',
                  p: { my: 0 }
                }}
              >
                <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                  Data notes
                </Heading>
                <MD source={info.notes} components={{ p: Text }} />
              </Card>
            )}
          </div>
        </Grid>
        <StateChart data={orderBy(daily, 'date')} colorMode={colorMode} />
        <Grid
          columns={[null, '2fr 1fr']}
          gap={[3, 4, 5]}
          sx={{ my: [4, null, null, 5] }}
        >
          <div>
            <Heading variant="headline" as="h2">
              Current stats
            </Heading>
            <Grid columns={[2, 4]}>
              <Stat value={latest.total} label="Total cases" />
              <Stat value={latest.hospitalized} label="Hospitalized" />
              <Stat value={latest.death} label="Deaths" />
              <Stat
                value={new Date(latest.dateChecked)
                  .toLocaleDateString()
                  .replace('/2020', '')
                  .replace('2020-', '')}
                label="Last updated"
              />
            </Grid>
          </div>
          <div>
            <Heading variant="headline" as="h2">
              State info
            </Heading>
            <Grid columns={2}>
              <Stat value={state.population} label="Population" />
              <Stat value={'#' + state.population_rank} label="Pop. rank" />
            </Grid>
          </div>
        </Grid>
        <Text sx={{ color: 'secondary', mt: 3 }}>
          Data from{' '}
          <Link href="https://covidtracking.com/">
            The COVID Tracking Project
          </Link>
          .
        </Text>
      </Container>
    </>
  )
}

export const getServerSideProps = async req => {
  const states = await loadJSON('./public/states-full.json')
  let { state } = req.query
  state =
    find(states, ['code', state.toUpperCase()]) ||
    find(states, ['slug', state.toLowerCase()])
  if (!state) return { props: { errorCode: 404 } }

  const { code } = state
  let daily = await getJSON(`https://covidtracking.com/api/states/daily`)
  daily = filter(daily, { state: code })
  const latest = daily.length ? daily[0] : {}
  let info = await getJSON(`https://covidtracking.com/api/states/info`)
  info = find(info, { state: code })
  return { props: { state, daily, latest, info } }
}
