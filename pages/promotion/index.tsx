import CarouselBanner from '@/components/CarouselBanner'
import HomeHotEventItem from '@/components/HomeHotEventItem'
import Dashboard from '@/components/Dashboard'
import useService from '@/utils/useService'
import { Box, Divider, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Activity } from '@/lib/types'
import { Image } from '@chakra-ui/image'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'

const PromotionListPage: React.FC = () => {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [activities, setActivities] = useState<Activity[]>([])
  const fetchActivity = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getActivityList()
      setActivities(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchActivity()
  }, [])
  return (
    <Dashboard>
      <main className="main">
        <section className="promotion">
          <Box className="promotion-box laout">
            <Box className="title-col" mt="4">
              优惠活动
            </Box>
            {/* 項目 */}
            <Box className="list-container mt-4">
              {activities.map((t, i) => (
                <Box
                  className="promo-item"
                  key={i}
                  onClick={() => router.push(`/promotion/${t.id}`)}
                >
                  <Box className="img-box">
                    <Image src={t.img} className="img-fluid" />
                  </Box>
                  <Box className="promo-content">
                    <Box className="title">{t.title}</Box>
                    <Box className="tag">活动详情</Box>
                    <Box className="time">
                      活動時間:{' '}
                      {t.start_at ? (
                        <span>
                          {toDate(t.start_at)} 至 {toDate(t.end_at)}
                        </span>
                      ) : (
                        '無限期'
                      )}
                    </Box>
                    {/* <Divider my="2" borderColor="gray.300" /> */}
                    <Box className="t-content" whiteSpace="pre-wrap">
                      {t.content}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </section>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default PromotionListPage
