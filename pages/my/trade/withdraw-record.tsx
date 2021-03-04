import BasicTable, { ColumnType } from '@/components/BasicTable'
import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import PageTabGroup from '@/components/PageTabGroup'
import TabGroup from '@/components/TabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { beforeDateRangeOpts, processStatusOpts } from '@/lib/options'
import { Withdraw } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { HiOutlineDuplicate } from 'react-icons/hi'

const WithdrawRecordPage: React.FC = () => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd, isLoading } = useLoaderProvider()
  const API = useRequest()
  const [withdraws, setWithdraws] = useState<Withdraw[]>([])
  const { toDateRange, toDateTime, toOptionName, toCurrency } = useTransfer()
  const start_at = useMemo(() => toDateRange(currentTab).start, [currentTab])
  const end_at = useMemo(() => toDateRange(currentTab).end, [currentTab])
  const { copyToClipboard } = useHelper()
  const fetchWithdraws = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getWithdrawList({
        start_at,
        end_at,
      })
      setWithdraws(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchWithdraws()
  }, [currentTab])

  const columns: ColumnType<Withdraw>[] = useMemo(
    () => [
      {
        title: '單號',
        render: (_, t) => (
          <HStack>
            <Text>{t.sn}</Text>
            <Box
              className="copy iconfont"
              onClick={() => copyToClipboard(t.sn)}
              cursor="pointer"
              fontSize="1.4rem"
              _hover={{ color: 'brand.500' }}
            ></Box>
          </HStack>
        ),
      },
      {
        title: '提領時間',
        render: (_, t) => toDateTime(t.created_at),
      },
      {
        title: '狀態',
        render: (_, t) => toOptionName(processStatusOpts, t.status),
      },
      {
        title: '金額',
        render: (_, t) => toCurrency(t.amount),
      },
    ],
    [],
  )
  const tabOpts = [
    { label: '充值纪录', value: 'deposit' },
    { label: '提领纪录', value: 'withdraw' },
  ]
  return (
    <Dashboard>
      <MemberMenu>
        <Box className="menu-content-section pt-0">
          {/* <div className="title-col">资金明细</div> */}
          <PageTabGroup
            options={tabOpts}
            value="withdraw"
            onChange={(v) => router.push(`/my/trade/${v}-record`)}
          />
          <TabGroup
            options={beforeDateRangeOpts}
            onChange={(value) => setCurrentTab(value)}
            value={currentTab}
            my="20px"
          />
          {!isLoading && (
            <>
              {!isEmpty ? (
                <BasicTable columns={columns} data={withdraws} />
              ) : (
                <EmptyHolder />
              )}
            </>
          )}
        </Box>
      </MemberMenu>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default WithdrawRecordPage
