import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import EventItem from '@/components/EventItem'
import Paginator from '@/components/Paginator'
import SectionOdds from '@/components/SectionOdds'
import TabGroup from '@/components/TabGroup'
import { usePaginationContext } from '@/context/PaginationProvider'
import { afterDateRangeOpts, sectionOpts } from '@/lib/options'
import { Handicap } from '@/lib/types'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, HStack, Spacer } from '@chakra-ui/layout'
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
const EventPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('today')
  const { fetchMarquee, fetchHandicaps, marquee, handicaps } = useService()
  const { toDateRange, toDateTime } = useTransfer()
  const [currentEvent, setCurrentEvent] = useState<Handicap>()
  const router = useRouter()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const { page } = usePaginationContext()
  const eventId = router.query?.hid
  useEffect(() => {
    fetchMarquee()
  }, [])

  useEffect(() => {
    fetchHandicaps({
      start_at,
      end_at,
      page,
    })
  }, [currentTab, page])

  useEffect(() => {
    if (handicaps.length === 0) return
    const event: Handicap =
      handicaps.find((t) => t.id === +eventId) || handicaps[0]
    router.replace({ query: { hid: event.id } })
  }, [handicaps])

  useEffect(() => {
    setCurrentEvent(handicaps.find((t) => t.id === +eventId))
  }, [router.query])
  return (
    <Dashboard>
      <main className="main">
        <section className="market">
          <Box className="market-box laout">
            <HStack mt="4">
              <Box className="title-col">市场列表</Box>
              <Spacer />
              <div
                className="title-bar-btn icon-btn"
                onClick={() => router.push('/scores')}
              >
                <i className="iconfont score"></i>即时比分
              </div>
            </HStack>
            <Box className="contents" mt="4">
              <div className="menu-wrap">
                <TabGroup
                  options={afterDateRangeOpts}
                  onChange={(value) => setCurrentTab(value)}
                  value={currentTab}
                />

                <div className="list-container">
                  {handicaps.map((t, i) => (
                    <EventItem
                      key={i}
                      event={t}
                      current={currentEvent}
                      onClick={() => router.replace({ query: { hid: t.id } })}
                    />
                  ))}
                </div>
                <Paginator />
              </div>
              {currentEvent ? (
                <div className="list-wrap">
                  <div className="top-bar mb-3">
                    <div className="left">
                      <h3>{currentEvent?.team_home.league_name}</h3>
                      <p>
                        {currentEvent?.team_home.name}(主) vs{' '}
                        {currentEvent?.team_away.name}
                        <span>{toDateTime(currentEvent?.play_at)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="score-bar">
                    <div className="row m-0">
                      {sectionOpts.map((t, i) => (
                        <SectionOdds
                          key={i}
                          handicap={currentEvent}
                          section={t}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <EmptyHolder />
              )}
            </Box>
          </Box>
        </section>
      </main>

      {/* <Footer />
      <FloatNav /> */}
    </Dashboard>
  )
}

export default EventPage
