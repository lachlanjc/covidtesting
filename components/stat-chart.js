import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'
import theme from '../lib/theme'
import commaNumber from 'comma-number'
import { orderBy } from 'lodash'

const StatChart = ({ data, dataKey, color }) => {
  const sortedData = orderBy(data, 'date')

  return (
    <ResponsiveContainer width="100%" height={96}>
      <LineChart data={sortedData}>
        <Tooltip
          separator=""
          formatter={value => [commaNumber(value)]}
          labelFormatter={() => ''}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={theme.colors[color]}
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default StatChart
