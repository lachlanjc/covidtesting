import { Grid, Link } from 'theme-ui'
import { Twitter, BarChart2, Bookmark, MapPin } from 'react-feather'

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

const Readings = () => (
  <Grid columns={[null, 2]} gap={3}>
    <Reading href="https://covidtracking.com/about-tracker/">
      <Bookmark />
      About the data
    </Reading>
    <Reading href="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html">
      <BarChart2 />
      NYTimes interactive on testing
    </Reading>
    <Reading href="https://twitter.com/NateSilver538/status/1240652133210492929">
      <Twitter />
      Nate Silver on testing
    </Reading>
    <Reading href="https://www.evive.care">
      <MapPin />
      Find testing near you
    </Reading>
  </Grid>
)

export default Readings
