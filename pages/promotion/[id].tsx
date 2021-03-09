import React, { useEffect, useMemo, useState } from 'react'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useTransfer from '@/utils/useTransfer'
import useRequest from '@/utils/useRequest'
import { ActivityDetail } from '@/lib/types'
import { useRouter } from 'next/dist/client/router'
import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'
import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import { Button, Image } from '@chakra-ui/react'
import useService from '@/utils/useService'

// import { Button } from 'react-bootstrap'

const PromotionDetailPage: React.FC = () => {
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const { applyActivity } = useService()
  const [activity, setActivity] = useState<ActivityDetail>(null)
  const router = useRouter()
  const id = useMemo(() => +router.query.id, [router.query])

  const fetchActivity = async () => {
    loadingStart()
    try {
      const res = await API.getActivityDetail(id)
      setActivity(res.data)
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    id && fetchActivity()
  }, [id])
  return (
    <Dashboard>
      <main className="main">
        <Flex w="full" h="500px" justify="center">
          <Image
            w="1920px"
            h="500px"
            maxW="1920px"
            src="/img/promotion-detail.jpg"
          ></Image>
        </Flex>
        <Box className="laout">
          {activity && (
            <Box>
              {/* <Box className="w-100 text-center">
                <img src={activity.img} className="img-fluid" />
              </Box> */}

              <Box className="promo-infoContainer">
                <Box className="promo-infoMain">
                  <Text className="promo-infoTitle">活动条件</Text>
                  <Box className="promo-contentWrap">
                    <Flex
                      className="content-middleBorder"
                      flexDir="column"
                      justify="center"
                      alignItems="flex-start"
                      fontSize="
                      18px"
                    >
                      <Flex color="gray.400">
                        活动标题 :{' '}
                        <Text
                          fontWeight="bold"
                          color="gray.600"
                          ml="5px"
                          flex="1"
                        >
                          {' '}
                          {activity?.title}
                        </Text>
                      </Flex>

                      <Flex color="gray.400">
                        活动时间 :{' '}
                        <Text
                          fontWeight="bold"
                          color="gray.600"
                          ml="5px"
                          flex="1"
                        >
                          {activity.start_at ? (
                            <>
                              {toDate(activity.start_at)}至
                              {toDate(activity.end_at)}
                            </>
                          ) : (
                            '無限期'
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Box>

              <Box className="promo-infoContainer">
                <Box className="promo-infoMain">
                  <Text className="promo-infoTitle">活动内容</Text>
                  <Box className="promo-contentWrap">
                    <Flex
                      className="content-middleBorder"
                      flexDir="column"
                      justify="center"
                      alignItems="flex-start"
                    >
                      {activity.content}
                      <Box w="200px" m="20px auto 30px">
                        <button
                          type="button"
                          className="primary_btn btnbase"
                          onClick={() => applyActivity(activity.id)}
                        >
                          活动申请
                        </button>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </main>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default PromotionDetailPage
