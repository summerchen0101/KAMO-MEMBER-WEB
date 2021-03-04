import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Handicap } from '@/lib/types'
import useTransfer from '@/utils/useTransfer'
import { useGlobalProvider } from '@/context/GlobalProvider'
import classNames from 'classnames'

function EventItem({
  event,
  onClick,
  current,
}: {
  event: Handicap
  onClick: () => void
  current: Handicap
}) {
  const router = useRouter()
  const { toDateTime } = useTransfer()
  return (
    <div
      className={classNames('team-item', { active: current?.id === event.id })}
      onClick={onClick}
    >
      <div className="info-col">
        <div className="time-col">
          {/* <div className="time text-red">
            <i className="iconfont iconclock" />
            00时22分19秒
          </div> */}

          {toDateTime(event.play_at)}
        </div>
        <div className="team-col">
          {event.team_home.name}(主) VS {event.team_away.name}
        </div>
        <div className="league-col">{event.team_home.league_name}</div>
      </div>
    </div>
  )
}

export default EventItem
