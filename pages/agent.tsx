import Dashboard from '@/components/Dashboard'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import { Image } from '@chakra-ui/image'
import { Box, Center, Flex, Stack, Text, Spacer } from '@chakra-ui/layout'
import React from 'react'

const agent: React.FC = () => {
  return (
    <Dashboard>
      <main className="main">
        <Center
          maxW="100vw"
          bgImg="url(../img/agent-bg.png)"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPos="50%"
          minH="calc(100vh - 110px)"
        >
          <Flex className="laout">
            <Center w="400px" flexDir="column">
              <Image mb="50px" src="/img/agent-title.png" />
              <Flex w="full" justifyContent="space-between">
                <Stack
                  w="190px"
                  bgColor="rgba(255,255,255,.7)"
                  p="16px"
                  borderRadius="5px"
                  boxShadow="0 10px 10px 0 rgba(139, 160, 203, 0.08);"
                >
                  <Flex alignItems="center">
                    <Image
                      src="/img/agent-brand.svg"
                      width="40px"
                      height="40px"
                    />
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      ml="10px"
                      color="brand.500"
                    >
                      领先的品牌
                    </Text>
                  </Flex>
                  <Text fontSize="14px" pt="10px">
                    提供玩家博彩优惠，玩家自定义投注，创建投注和快速挑选累加器。
                  </Text>
                </Stack>

                <Stack
                  w="190px"
                  bgColor="rgba(255,255,255,.7)"
                  p="16px"
                  borderRadius="5px"
                  boxShadow="0 10px 10px 0 rgba(139, 160, 203, 0.08);"
                >
                  <Flex alignItems="center">
                    <Image
                      src="/img/agent-commiss.svg"
                      width="40px"
                      height="40px"
                    />
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      ml="10px"
                      color="brand.500"
                    >
                      超高返佣比
                    </Text>
                  </Flex>
                  <Text fontSize="14px" pt="10px">
                    我们的支付结构允许您从您的每位玩家中赚取超高返佣。
                  </Text>
                </Stack>
              </Flex>
            </Center>
            <Box w="800px">
              <Image src="/img/agent-pic.png" />
            </Box>
          </Flex>
        </Center>
        <Footer />
      </main>

      <FloatNav />
    </Dashboard>
  )
}

export default agent
