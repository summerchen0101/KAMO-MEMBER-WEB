import Marquee from '@/components/Marquee'
import { usePopupContext } from '@/context/PopupContext'
import useService from '@/utils/useService'
import { Box, HStack } from '@chakra-ui/layout'
import { flexbox, Image } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect } from 'react'
import HeaderUserInfo from './HeaderUserInfo'
const Dashboard: React.FC = ({ children }) => {
  const router = useRouter()
  const { fetchMarquee, fetchUserInfo, marquee } = useService()
  const [, setLoginVisible] = usePopupContext('login')

  useEffect(() => {
    Promise.all([fetchMarquee(), fetchUserInfo()])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <>
      <nav className="navbar">
        <HStack className="head">
          <Box className="headbox laout">
            {/* <Box className="left">
              <Box
                className="iconfont notification text-white"
                fontSize="18px"
              ></Box>
              <Marquee msgs={marquee} />
            </Box> */}
            <Box className="leftbox">
              <Box className="lang">
                <Image src="/img/lang_cn.png" w="22px" h="22px" mr="5px" />
                中国-简体中文
                <Box className="iconfont ic-down" ml="4px"></Box>
              </Box>

              <Box
                w="2px"
                h="14px"
                bg="rgba(255, 255, 255, .3)"
                mx="10px"
              ></Box>
              <text className="time">GMT+8 2021-02-08 17:20:35</text>
            </Box>

            <Box className="rightbox">
              <HeaderUserInfo />
            </Box>
          </Box>
        </HStack>
        <div className="nav-bg ">
          <div className="nav-content laout ">
            <img className="logo" src="/img/logo.svg" />
            <ul className="menu">
              <li>
                <Link href="/home">首页</Link>
              </li>
              <li>
                <Link href="/events">体育赛事</Link>
              </li>
              <li>
                <Link href="/promotion">优惠活动</Link>
              </li>
              <li>
                <Link href="/agent">合营计划</Link>
              </li>
              <li>
                <Link href="/promotion">APP下载</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}

export default Dashboard
