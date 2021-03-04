import Marquee from '@/components/Marquee'
import { usePopupContext } from '@/context/PopupContext'
import useService from '@/utils/useService'
import { Box, HStack } from '@chakra-ui/layout'
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
        <HStack className="header">
          <Box className="wrap laout" px="25px">
            <Box className="left">
              <Box
                className="iconfont notification text-white"
                fontSize="18px"
              ></Box>
              <Marquee msgs={marquee} />
            </Box>
            <Box className="right">
              <HeaderUserInfo />
            </Box>
          </Box>
        </HStack>
        <div className="nav">
          <div className="wrap laout padding">
            <img className="logo" src="/img/logo.png" />
            <ul className="menu">
              <li>
                <Link href="/home">首页</Link>
              </li>
              <li>
                <Link href="/events">市场列表</Link>
              </li>
              <li>
                <Link href="/bet-record">投资记录</Link>
              </li>
              <li>
                <Link href="/bet-history">账务历史</Link>
              </li>
              <li>
                <Link href="/scores">即时比分</Link>
              </li>
              <li>
                <Link href="/agent">合营计划</Link>
              </li>
              <li>
                <Link href="/promotion">优惠活动</Link>
              </li>
              <li>
                <Link href="/my/profile">会员中心</Link>
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
