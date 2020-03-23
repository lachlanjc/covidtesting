import React from 'react'
import { geoCentroid } from 'd3-geo'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from 'react-simple-maps'
import { useThemeUI } from 'theme-ui'
import { scaleQuantile } from 'd3-scale'
import { map, find, round, kebabCase } from 'lodash'
import Router from 'next/router'
import allStates from '../public/states.json'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
}

const StatesGraphic = ({ data, colorRange }) => {
  const { theme, colorMode } = useThemeUI()
  // http://www.colorbox.io/#steps=8#hue_start=17#hue_end=70#hue_curve=easeInOutSine#sat_start=28#sat_end=41#sat_curve=easeOutCubic#sat_rate=200#lum_start=71#lum_end=94#lum_curve=easeInExpo#lock_hex=e55934#minor_steps_map=0,30,40
  const colorScale = scaleQuantile()
    .domain(map(data, 'totalPC'))
    .range(colorRange)
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const { name } = geo.properties
              const cur = find(data, { name })
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale(cur?.totalPC) : theme.colors.sheet}
                  onClick={() => Router.push(`/${kebabCase(name)}`)}
                  style={{ cursor: 'pointer' }}
                />
              )
            })}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo)
              const cur = find(allStates, { name: geo.properties?.name })
              if (!cur) return
              const stateData = find(data, { name: geo.properties?.name })
              const label = cur.abbrev || round(stateData.totalPC, 1)
              return (
                <g key={geo.rsmKey + '-flag'}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (!Object.keys(offsets).includes(cur.abbrev) ? (
                      <Marker coordinates={centroid}>
                        <text
                          y={2}
                          fontSize={14}
                          textAnchor="middle"
                          fill={theme.colors.text}
                        >
                          {label}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur?.abbrev]?.[0]}
                        dy={offsets[cur?.abbrev]?.[1]}
                        fill={theme.colors.muted}
                      >
                        <text
                          x={4}
                          fontSize={14}
                          alignmentBaseline="middle"
                          fill={theme.colors.text}
                        >
                          {label}
                        </text>
                      </Annotation>
                    ))}
                </g>
              )
            })}
          </>
        )}
      </Geographies>
      <style jsx>{`
        .rsm-geography {
          cursor: pointer;
        }
        text {
          pointer-events: none;
        }
      `}</style>
    </ComposableMap>
  )
}

export default StatesGraphic
