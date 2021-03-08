import CarouselBanner from '@/components/CarouselBanner'
import HomeHotEventItem from '@/components/HomeHotEventItem'
import Dashboard from '@/components/Dashboard'
import useService from '@/utils/useService'
import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/layout'
import {
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from '@chakra-ui/react'

import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'
import { Handicap } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import { useGlobalProvider } from '@/context/GlobalProvider'
import Marquee from '@/components/Marquee'
import _ from 'lodash'
// import Link from 'next/link'

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
      <main className="main ">
        {/* 轮播 */}
        <CarouselBanner banners={banners} />
        {/* 公告 */}
        <Marquee msgs={marquee} />
        {/* APP下载 */}
        <Stack display="flex" className="appDownload-container laout">
          <Center w="full" m="45px auto 45px auto">
            <Image src="/img/title-appDownload.png" w="411px" h="73px"></Image>
          </Center>
          <Center w="full">
            <Box className="appDownload-leftbox">
              <Image src="/img/appdownload.png"></Image>
            </Box>
            <Box className="appDownload-rightbox">
              <Flex w="full" justifyContent="center" m="30px 0 45px">
                <Center mr="10px" className="third_btn active">
                  全站APP
                </Center>
                <Center className="third_btn">体育APP</Center>
              </Flex>
              <Box w="full" className="sideContent">
                <Text className="title">随时随地 尊荣独享</Text>
                <Text className="description">
                  棋牌、彩票、真人娱乐、体育赛事、电子游艺、电子竞技，您所要的尽在KAMO。行业种类最全娱乐APP，KAMO为您呈现尊容的极致体验。
                </Text>
                <Flex justifyContent="space-around">
                  <Box>
                    <Center className="codeWraper">
                      <Image
                        w="150px"
                        h="150px"
                        src="/img/home-appQrcode.svg"
                      ></Image>
                    </Center>
                    <Box className="codeBottom">
                      <Text>
                        扫码下载APP<br></br>支持IOS & Android全设备
                      </Text>
                      <Link>https://www.kamo.app</Link>
                    </Box>
                  </Box>
                  <Box>
                    <Center className="codeWraper">
                      <Image src="/img/home-h5.png" w="120px" h="136px"></Image>
                    </Center>
                    <Box className="codeBottom">
                      <Text>
                        直接访问<br></br>无需下载，手机输入网址即可
                      </Text>
                      <Link>https://www.kamo.app</Link>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Center>
        </Stack>
        {/* 服务与优势 */}
        <Stack w="100%" className="service-container laout">
          <Center w="full" m="35px auto 55px auto">
            <Image src="/img/title-service.png" w="411px" h="73px"></Image>
          </Center>
          <Box className="service-wrap ">
            <Box className="service-itemBox">
              <Image src="/img/home-service01.png" w="140px" h="140px"></Image>
              <Box className="service-content">
                <Text className="title">极速存取转款</Text>
                <Text className="description">
                  最新技术自主研发的财务处理系统真正做到极速存、取、转独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟。
                </Text>
              </Box>
            </Box>
            <Box className="service-itemBox">
              <Image src="/img/home-service02.png" w="140px" h="140px"></Image>
              <Box className="service-content">
                <Text className="title">海量赛事种类</Text>
                <Text className="description">
                  每天为您提供近千场精彩体育赛事，更有真人、彩票、电子游戏等多种娱乐方式选择，让您拥有完美游戏体验。
                </Text>
              </Box>
            </Box>
            <Box className="service-itemBox">
              <Image src="/img/home-service03.png" w="140px" h="140px"></Image>
              <Box className="service-content">
                <Text className="title">加密安全管理</Text>
                <Text className="description">
                  独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注、无后顾之忧！
                </Text>
              </Box>
            </Box>
            <Box className="service-itemBox">
              <Image src="/img/home-service03.png" w="140px" h="140px"></Image>
              <Box className="service-content">
                <Text className="title">三端任您选择</Text>
                <Text className="description">
                  引领市场的卓越技术，自主研发了全套终端应用，让您畅享Web、H5，更有iOS、Android原生APP，让您随时随地，娱乐投注随心所欲！7x24小时在线客服提供最贴心、最优质的服务。
                </Text>
              </Box>
            </Box>
          </Box>
        </Stack>
      </main>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default Home
