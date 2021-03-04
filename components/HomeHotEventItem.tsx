import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { Text } from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import React from 'react'
import numeral from 'numeral'

function HomeHotEventItem({ event }: { event: Handicap }) {
  const { toDateTime } = useTransfer()
  return (
    <div className="match">
      <h2>-{event.league.name}-</h2>
      <CircularProgress
        className="chart-col"
        value={30}
        color="brand.500"
        size="120px"
        thickness="7px"
      >
        <CircularProgressLabel fontSize="sm">
          總搶購量
          <Text color="brand.500" fontSize="xl">
            {numeral(event?.bet_sum).divide(10000).format('0,0')}M
          </Text>
        </CircularProgressLabel>
      </CircularProgress>
      {/* <div className="chart-col">
                      <span>總搶購量</span>
                      <div className="donut-chart" id="donut-chart" />
                    </div> */}
      <div className="time text-red">
        <i className="iconfont clock" />
        {toDateTime(event.play_at)}
      </div>
      <div className="team-vs">
        {event.team_home.name}(主) <small>VS</small> {event.team_away.name}
      </div>
      <div
        className="btnbase primary_btn"
        // onClick="location.href = 'market.html'"
      >
        进入市场
      </div>
    </div>
  )
}

export default HomeHotEventItem
