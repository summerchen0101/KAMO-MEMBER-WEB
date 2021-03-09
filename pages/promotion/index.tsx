import CarouselBanner from '@/components/CarouselBanner'
import HomeHotEventItem from '@/components/HomeHotEventItem'
import Dashboard from '@/components/Dashboard'
import useService from '@/utils/useService'
import { Box, Center, Divider, Flex, Stack, Text } from '@chakra-ui/layout'
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
        <Box className="laout">
          {/* 活动 */}
          <Box w="full" h="470px" mb="20px">
            <Image w="100%" h="auto" src="/img/promotion.png"></Image>
          </Box>
          {/* 項目 */}
          <Flex mb="40px">
            <Box className="promo-menuWrap">
              <ul className="tab-inner">
                <li className="active">全部优惠</li>
                <li>限时优惠</li>
              </ul>
            </Box>
            <Stack
              direction={['column']}
              spacing="30px"
              className="promo-centerContent"
            >
              {activities.map((t, i) => (
                <Box
                  className="promo-acyivityList"
                  key={i}
                  onClick={() => router.push(`/promotion/${t.id}`)}
                >
                  <Box className="itemText">
                    <Box className="tag" bgColor="red.500">
                      全部优惠
                    </Box>
                    <Box className="title">{t.title}</Box>
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
                    <Center className="third_btn active">查看详情</Center>

                    {/* <Box className="t-content" whiteSpace="pre-wrap">
                      {t.content}
                    </Box> */}
                  </Box>
                  <Box className="imgBox">
                    {/* <Image src={t.img} /> */}
                    <Image src="/img/promotion-item.jpg"></Image>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Flex>
        </Box>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default PromotionListPage
