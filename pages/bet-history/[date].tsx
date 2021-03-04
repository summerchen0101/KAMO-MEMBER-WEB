import React, { useEffect, useMemo, useState } from 'react'
import Dashboard from '@/components/Dashboard'
import { useRouter } from 'next/dist/client/router'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { BetRecord } from '@/lib/types'
import _ from 'lodash'
import moment from 'moment'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'
import EmptyHolder from '@/components/EmptyHolder'
import { Box, Flex, Text } from '@chakra-ui/layout'
import TabGroup from '@/components/TabGroup'
import {
  accountingStatusOpts,
  beforeDateRangeOpts,
  sectionOpts,
} from '@/lib/options'
import useHelper from '@/utils/useHelper'

const BetHistoryDetail: React.FC = () => {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const date = useMemo(() => router.query.date as string, [router])
  const API = useRequest()
  const {
    toDate,
    toCurrency,
    amountToCanWin,
    toOptionName,
    toDateTime,
  } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])
  const { copyToClipboard } = useHelper()
  const fetchBetRecord = async () => {
    loadingStart()
    try {
      const res = await API.getBetRecordList({
        start_at: moment(date).startOf('day').unix(),
        end_at: moment(date).endOf('day').unix(),
      })
      setBetRecords(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    date && fetchBetRecord()
  }, [date])
  return (
    <Dashboard>
      <main className="main">
        <section className="detail">
          <Box className="detail-box laout">
            <Flex justifyContent="space-between" alignItems="center" my="4">
              <Box className="title-col">{date} 投资记录</Box>

              <Box className="total-count">
                <Box className="count-event">
                  <p>
                    笔数
                    <span className="text-blue">
                      {toCurrency(betReocrds.length)}
                    </span>
                  </p>
                </Box>
                <Box className="count-event">
                  <p>
                    累计流水
                    <span className="text-blue">
                      {toCurrency(_.sumBy(betReocrds, 'amount'))}
                    </span>
                  </p>
                </Box>
                <Box className="count-event">
                  <p>
                    预估获利
                    <span className="text-green">
                      {toCurrency(
                        _.sumBy(betReocrds, (t) =>
                          amountToCanWin(t.amount, t.odds),
                        ),
                      )}
                    </span>
                  </p>
                </Box>
              </Box>
            </Flex>

            <Box className="detail-content-main" whiteSpace="nowrap">
              {!isEmpty ? (
                <Box className="list-container mt-4">
                  <Box className="thead">
                    <Box className="bd_data">单号</Box>
                    <Box className="bd_data">开赛时间</Box>
                    <Box className="bd_data">交易时间</Box>
                    <Box className="bd_data">联盟</Box>
                    <Box className="bd_data">队伍</Box>
                    <Box className="bd_data">比分</Box>
                    <Box className="bd_data">投注额</Box>
                    <Box className="bd_data">赔率</Box>
                    <Box className="bd_data">预估获利</Box>
                    <Box className="bd_data">状态</Box>
                  </Box>
                  {betReocrds.map((bet, i) => (
                    <Box className="tth" key={i}>
                      <Box className="bd_data">
                        {bet.sn}
                        <i
                          className="copy iconfont"
                          onClick={() => copyToClipboard(bet.sn)}
                        />
                      </Box>
                      <Box className="bd_data" whiteSpace="normal">
                        {toDateTime(bet.handicap.play_at)}
                      </Box>
                      <Box className="bd_data" whiteSpace="normal">
                        {toDateTime(bet.created_at)}
                      </Box>
                      <Box
                        className="bd_data"
                        whiteSpace="normal"
                        wordBreak="break-all"
                      >
                        {bet.handicap.team_home.league_name}
                      </Box>
                      <Box className="bd_data" whiteSpace="normal">
                        {bet.handicap.team_home.name}(主) <small>VS</small>{' '}
                        {bet.handicap.team_away.name}
                      </Box>
                      <Box className="bd_data">
                        <span className="text-red">反对</span>
                        {toOptionName(sectionOpts, bet.section_code)}坡胆{' '}
                        {bet.home_point}-{bet.away_point}
                      </Box>
                      <Box className="bd_data">{toCurrency(bet.amount)}</Box>
                      <Box className="bd_data">
                        {(bet.odds * 100).toFixed(2)}%
                      </Box>
                      <Box className="bd_data">
                        <p>{amountToCanWin(bet.amount, bet.odds)}</p>
                      </Box>
                      <Box className="bd_data">
                        <p>
                          {toOptionName(
                            accountingStatusOpts,
                            bet.accounting_status,
                          )}
                        </p>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <EmptyHolder />
              )}

              {/* <Paginator /> */}
            </Box>
          </Box>
        </section>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default BetHistoryDetail
