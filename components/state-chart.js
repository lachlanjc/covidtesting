import theme from '../lib/theme'
import { startCase } from 'lodash'
import human from 'human-format'
import commaNumber from 'comma-number'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid
} from 'recharts'

const shortDate = d => new Date(d).toLocaleDateString().replace('/2020', '')

const StateChart = ({ data, colorMode }) => (
  <ResponsiveContainer width="100%" height={384}>
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dateChecked" tickFormatter={shortDate} />
      <YAxis
        tickFormatter={n => human(n).replace(' ', '')}
        label={{ value: 'Tests', angle: -90, position: 'left' }}
      />
      <Tooltip
        separator=": "
        labelFormatter={shortDate}
        formatter={(value, key) => [commaNumber(value), startCase(key)]}
      />
      <Line
        type="monotone"
        dataKey="positive"
        stroke={theme.colors.red}
        strokeWidth={3}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="negative"
        stroke={theme.colors.blue}
        strokeWidth={3}
        dot={false}
      />
      <Line
        type="monotone"
        dataKey="pending"
        stroke={theme.colors.muted}
        strokeWidth={3}
        dot={false}
      />

      <style>{`
        .recharts-label,
        .recharts-text {
          fill: ${theme.colors.muted};
        }
        .recharts-default-tooltip {
          border-radius: 0.375rem;
        }
        .recharts-tooltip-label {
          font-family: ${theme.fonts.heading};
          font-size: 2rem;
          line-height: 1.5;
        }
        ${colorMode === 'dark' &&
          `
          .recharts-default-tooltip {
            background-color: #1e1e1e !important;
          }
          .recharts-label {
            fill: ${theme.colors.snow};
          }
          .recharts-tooltip-label {
            color: ${theme.colors.snow};
          }
          .recharts-layer:not(.recharts-active-dot) .recharts-dot {
            fill: ${theme.colors.dark} !important;
          }
          line.recharts-cartesian-axis-line,
          line.recharts-cartesian-axis-tick-line,
          .recharts-cartesian-grid line {
            opacity: 0.25 !important;
          }
        `}
      `}</style>
    </LineChart>
  </ResponsiveContainer>
)

export default StateChart
