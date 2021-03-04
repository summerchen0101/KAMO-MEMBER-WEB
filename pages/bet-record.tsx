// import FooterNavBar from '@/components/FooterNavBar'
// import HeaderTitleBar from '@/components/HeaderTitleBar'
import BasicTable, { ColumnType } from '@/components/BasicTable'
import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import TabGroup from '@/components/TabGroup'
// import Tab from '@/components/Tab'
// import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { accountingStatusColorMap } from '@/lib/colorMaps'
import { AccountingStatus } from '@/lib/enums'
import {
  accountingStatusOpts,
  beforeDateRangeOpts,
  processStatusOpts,
  sectionOpts,
} from '@/lib/options'
import { BetRecord } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
// import BettingItem from '@/components/BettingItem'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const BettingsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { isLoading, loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { copyToClipboard } = useHelper()
  const {
    toDateRange,
    toCurrency,
    amountToCanWin,
    toDateTime,
    toOptionName,
  } = useTransfer()
  const [betReocrds, setBetRecords] = useState<BetRecord[]>([])
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const fetchBetRecord = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getBetRecordList({
        start_at,
        end_at,
      })
      setBetRecords(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  const columns: ColumnType<BetRecord>[] = useMemo(
    () => [
      {
        title: '單號',
        render: (_, t) => (
          <Box
            className="copy iconfont"
            onClick={() => copyToClipboard(t.sn)}
            cursor="pointer"
            fontSize="1.4rem"
            _hover={{ color: 'brand.500' }}
          ></Box>
        ),
      },
      {
        title: '開賽時間',
        render: (_, t) => toDateTime(t.handicap.play_at),
      },
      {
        title: '交易时间',
        render: (_, t) => toDateTime(t.created_at),
      },
      {
        title: '联盟',
        render: (_, t) => t.handicap.team_home.league_name,
      },
      {
        title: '隊伍',
        render: (_, t) => (
          <Stack>
            <Text>{t.handicap.team_home.name}(主)</Text>
            <Text>{t.handicap.team_away.name}</Text>
          </Stack>
        ),
      },
      {
        title: '比分',
        render: (_, t) => (
          <>
            {toOptionName(sectionOpts, t.section_code)}坡胆 <br />
            {t.home_point}-{t.away_point}
          </>
        ),
      },
      {
        title: '投注額',
        render: (_, t) => <Text fontSize="lg">{toCurrency(t.amount)}</Text>,
      },
      {
        title: '賠率',
        render: (_, t) => <>{(t.odds * 100).toFixed(2)}%</>,
      },
      {
        title: '預估獲利',
        render: (_, t) => amountToCanWin(t.amount, t.odds),
      },
      {
        title: '状态',
        render: (_, t) => {
          return (
            <Text color={accountingStatusColorMap[t.accounting_status]}>
              {toOptionName(accountingStatusOpts, t.accounting_status)}
            </Text>
          )
        },
      },
    ],
    [],
  )
  useEffect(() => {
    fetchBetRecord()
  }, [currentTab])
  return (
    <Dashboard>
      <main className="main">
        <section className="detail">
          <Box className="detail-box laout">
            <Box className="title-col" mt="4">
              投资记录
            </Box>
            <Box className="d-flex justify-content-between my-4">
              <TabGroup
                options={beforeDateRangeOpts}
                onChange={(value) => setCurrentTab(value)}
                value={currentTab}
              />

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
            </Box>
            {!isLoading && (
              <Box className="detail-content-main">
                {!isEmpty ? (
                  <BasicTable columns={columns} data={betReocrds} />
                ) : (
                  <EmptyHolder />
                )}

                {/* <Paginator /> */}
              </Box>
            )}
          </Box>
        </section>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default BettingsPage
