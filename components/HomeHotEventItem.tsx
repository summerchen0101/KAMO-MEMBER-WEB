import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
import React, { useMemo } from 'react'
import numeral from 'numeral'
import { useRouter } from 'next/dist/client/router'

function HomeHotEventItem({ event }: { event: Handicap }) {
  const { toDateTime } = useTransfer()
  const router = useRouter()
  const percent = useMemo(
    () =>
      event.single_game_limit
        ? Math.round(event.bet_sum / event.single_game_limit)
        : 100,
    [event],
  )
  return (
    <div className="match">
      <h2>-{event.team_home.league_name}-</h2>
      <Box
        className="chart-col"
        value={100}
        color="brand.500"
        size="120px"
        thickness="7px"
      >
        <span> 總搶購量</span>

        <Text color="brand.500" fontSize="xl" className="count text-blue">
          {numeral(event?.bet_sum).divide(10000).format('0,0.0')}M
        </Text>
      </Box>
      <div className="time text-red">
        <i className="iconfont clock" />
        {toDateTime(event.play_at)}
      </div>
      <div className="team-vs">
        {event.team_home.name}(主) <small>VS</small> {event.team_away.name}
      </div>
      <div
        className="btnbase primary_btn"
        onClick={() =>
          router.push({ pathname: '/events', query: { id: event.id } })
        }
      >
        进入市场
      </div>
    </div>
  )
}

export default HomeHotEventItem
