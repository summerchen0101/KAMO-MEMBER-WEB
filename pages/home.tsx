import CarouselBanner from '@/components/CarouselBanner'
import HomeHotEventItem from '@/components/HomeHotEventItem'
import Dashboard from '@/components/Dashboard'
import useService from '@/utils/useService'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'
import { Handicap } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useGlobalProvider } from '@/context/GlobalProvider'
import _ from 'lodash'

const Home: React.FC = () => {
  const [handicaps, setHandicaps] = useState<Handicap[]>([])
  const router = useRouter()
  const {
    fetchMarquee,
    fetchBanners,
    fetchUserInfo,
    marquee,
    banners,
  } = useService()
  const API = useRequest()
  const { user } = useGlobalProvider()

  const fetchHotHandicaps = async () => {
    try {
      const res = await API.getHotHandicaps()
      setHandicaps(_.take(res.data.list, 4))
    } catch (err) {}
  }

  useEffect(() => {
    Promise.all([
      fetchMarquee(),
      fetchBanners(),
      fetchUserInfo(),
      fetchHotHandicaps(),
    ])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <Dashboard>
      <main className="main">
        <section className="index">
          {/* 轮播 */}
          <CarouselBanner banners={banners} />

          {/* 热门赛事 */}
          <Box className="hot-game laout">
            <Text className="main-title center" mt="4" mb="50px">
              热门赛事
            </Text>
            <Box className="all-match">
              {handicaps.map((t, i) => (
                <HomeHotEventItem key={i} event={t} />
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

export default Home
