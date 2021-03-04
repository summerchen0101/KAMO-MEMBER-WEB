import CarouselBanner from '@/components/CarouselBanner'
import HomeHotEventItem from '@/components/HomeHotEventItem'
import Layout from '@/components/Dashboard'
import useService from '@/utils/useService'
import { Box, Text } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

const Home: React.FC = () => {
  const router = useRouter()
  const {
    fetchMarquee,
    fetchBanners,
    fetchUserInfo,
    fetchHandicaps,
    banners,
    handicaps,
  } = useService()

  useEffect(() => {
    Promise.all([
      fetchMarquee(),
      fetchBanners(),
      fetchUserInfo(),
      fetchHandicaps({ perpage: 4 }),
    ])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <Layout>
      <section className="index">
        {/* 轮播 */}
        <CarouselBanner banners={banners} />

        {/* 热门赛事 */}
        <Box className="hot-game laout">
          <Text className="main-title center" mt="20px" mb="50px">
            热门赛事
          </Text>
          <Box className="all-match">
            {handicaps.map((t, i) => (
              <HomeHotEventItem key={i} event={t} />
            ))}
          </Box>
        </Box>
      </section>
    </Layout>
  )
}

export default Home
