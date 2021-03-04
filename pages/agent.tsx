import Dashboard from '@/components/Dashboard'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React from 'react'

const agent: React.FC = () => {
  return (
    <Dashboard>
      <main className="main">
        <section className="agent">
          <Box className="agent-box laout" maxW="100vw">
            <Box className="agent-info">
              <img className="agent-title" src="/img/agent-title.png" />
              <Box className="d-flex">
                <Box className="slogan">
                  <Box className="title">
                    <img
                      src="/img/agent-brand.svg"
                      width="36px"
                      height="36px"
                    />
                    领先的品牌
                  </Box>
                  <p>
                    提供体育博彩优惠，玩家自定义投注，创建投注和快速挑选累加器。
                  </p>
                </Box>
                <Box className="slogan">
                  <Box className="title">
                    <Image
                      src="/img/agent-commiss.svg"
                      width="36px"
                      height="36px"
                    />
                    55%拥金
                  </Box>
                  <p>
                    我们的支付结构允许您从您的每位玩家中赚取最高55%%的佣金。
                  </p>
                </Box>
              </Box>
            </Box>
            <Box className="brand-img">
              <Image src="/img/agent-pic.png" maxW="initial" />
            </Box>
          </Box>
          <Footer />
        </section>
      </main>

      <FloatNav />
    </Dashboard>
  )
}

export default agent
