import Marquee from '@/components/Marquee'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import useService from '@/utils/useService'
import Icon from '@chakra-ui/icon'
import { HStack } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const { fetchMarquee, fetchUserInfo, marquee } = useService()
  const [, setLoginVisible] = usePopupContext('login')
  const { user } = useGlobalProvider()

  useEffect(() => {
    Promise.all([fetchMarquee(), fetchUserInfo()])
    return () => {
      // slider.removeAllSlides()
    }
  }, [])
  return (
    <>
      <nav className="navbar">
        <HStack className="header" px="15px">
          <Icon color="#fff" as={HiOutlineSpeakerphone} />
          <Marquee msgs={marquee} />
        </HStack>
        <div className="nav">
          <div className="wrap laout padding">
            <img className="logo" src="./img/logo.png" />
            <ul className="menu">
              <li>
                <a className="active" href="./index.html">
                  首页
                </a>
              </li>
              <li>
                <a href="./market.html">市场列表</a>
              </li>
              <li>
                <a href="./detail.html">投资记录</a>
              </li>
              <li>
                <a href="./history.html">账务历史</a>
              </li>
              <li>
                <a href="./gameresult.html">比赛结果</a>
              </li>
              <li>
                <a href="./agent.html">合营计划</a>
              </li>
              <li>
                <a href="./promotion.html">优惠活动</a>
              </li>
              <li>
                <a href="./mc-profile.html">会员中心</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="main">{children}</main>

      <div className="nav-side">
        <div className="item">
          <a href="./mc-recharge.html">
            <img src="./img/save.png" />
            <h2>充值</h2>
          </a>
        </div>
        <div className="item">
          <a href="./mc-withdrawal.html">
            <img src="./img/get.png" />
            <h2>提领</h2>
          </a>
        </div>
        <div className="item">
          <a href="./promotion.html">
            <img src="./img/discount.png" />
            <h2>优惠</h2>
          </a>
        </div>
        <div className="item">
          <a href="./scroe.html">
            <img src="./img/score.png" />
            <h2>比分</h2>
          </a>
        </div>
        <div className="item">
          <a href="./mc-cash-record.html">
            <img src="./img/detail.png" />
            <h2>明细</h2>
          </a>
        </div>
        <div className="item">
          <a href="./mc-gameresult.html">
            <img src="./img/game.png" />
            <h2>比赛</h2>
          </a>
        </div>
        <div className="item">
          <a href="#">
            <i className="iconfont clear" />
          </a>
        </div>
      </div>
      <footer className="footer">
        <div className="copyright">Copyright © 2021 AG Reserved</div>
        <ul className="article-menu">
          <li>
            <a href="./hp-about.html">关于AG</a>
          </li>
          <li>
            <a href="././hp-policy.html">条款与规则</a>
          </li>
          <li>
            <a href="./hp-main.html">幫助中心</a>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default Layout
