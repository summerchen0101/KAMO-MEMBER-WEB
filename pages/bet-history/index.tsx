// import FooterNavBar from '@/components/FooterNavBar'
// import HeaderTitleBar from '@/components/HeaderTitleBar'
import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import TabGroup from '@/components/TabGroup'
// import Tab from '@/components/Tab'
// import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import {
  accountingStatusOpts,
  beforeDateRangeOpts,
  sectionOpts,
} from '@/lib/options'
import { BetRecordSummary } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
// import BettingItem from '@/components/BettingItem'
import { Box } from '@chakra-ui/layout'
import { Table, Thead, Tr } from '@chakra-ui/table'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

const BetHistory: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd, isLoading } = useLoaderProvider()
  const API = useRequest()
  const { toDate, toCurrency, toDateRange } = useTransfer()
  const [summaries, setSummaries] = useState<BetRecordSummary[]>([])
  const totalInfo = useMemo(() => {
    return {
      count: _.sumBy(summaries, 'count'),
      amount: _.sumBy(summaries, (t) => +t.amount),
      result: _.sumBy(summaries, (t) => +t.result),
    }
  }, [summaries])
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])

  const fetchBetRecordSummary = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getBetRecordSummary({
        start_at,
        end_at,
      })
      setSummaries(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchBetRecordSummary()
  }, [currentTab])
  return (
    <Dashboard>
      <main className="main">
        <section className="detail">
          <Box className="detail-box laout">
            <Box className="title-col" mt="4">
              账务历史
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
                    累计笔数
                    <span className="text-white">
                      {toCurrency(totalInfo.count)}
                    </span>
                  </p>
                </Box>
                <Box className="count-event">
                  <p>
                    累计流水
                    <span className="text-blue">
                      {toCurrency(totalInfo.amount)}
                    </span>
                  </p>
                </Box>
                <Box className="count-event">
                  <p>
                    总收益
                    <span
                      className={classNames({
                        'text-green': totalInfo.result > 0,
                        'text-red': totalInfo.result < 0,
                      })}
                    >
                      {toCurrency(totalInfo.result)}
                    </span>
                  </p>
                </Box>
              </Box>
            </Box>
            {!isLoading && (
              <Box className="history-content-main" whiteSpace="nowrap">
                {!isEmpty ? (
                  <Box className="list-container mt-4">
                    <Box className="thead">
                      <Box className="bd_data">日期</Box>
                      <Box className="bd_data">笔数</Box>
                      <Box className="bd_data">下注金额</Box>
                      <Box className="bd_data">总收益</Box>
                      <Box className="bd_data">明细</Box>
                    </Box>
                    {summaries.map((bet, i) => (
                      <Box className="tth" key={i}>
                        <Box className="bd_data">{bet.date}</Box>
                        <Box className="bd_data">{bet.count}</Box>
                        <Box className="bd_data">{toCurrency(+bet.amount)}</Box>
                        <Box className="bd_data">{toCurrency(+bet.result)}</Box>
                        <Box className="bd_data">
                          <Link href={`/bet-history/${bet.date}`}>
                            <Icon
                              as={HiOutlineSearch}
                              cursor="pointer"
                              fontSize="18px"
                              _hover={{ color: 'brand.500' }}
                            />
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </Box>
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

export default BetHistory
