import React, { useEffect, useMemo, useState } from 'react'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useTransfer from '@/utils/useTransfer'
import useRequest from '@/utils/useRequest'
import { ActivityDetail } from '@/lib/types'
import { useRouter } from 'next/dist/client/router'
import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
import FloatNav from '@/components/FloatNav'
import { Box, Text } from '@chakra-ui/layout'
import useService from '@/utils/useService'

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
        <section className="promotion">
          <Box className="promotion-box laout">
            <Box className="title-col" mt="4">
              {activity?.title}
            </Box>
            {activity && (
              <Box className="promotion-detail section-padding mt-3">
                <Box className="w-100 text-center">
                  <img src={activity.img} className="img-fluid" />
                </Box>
                <Box className="w-100 mt-3">
                  <Text color="gray.400" mb="2" className="text-center">
                    活动时间 :{' '}
                    {activity.start_at ? (
                      <>
                        {toDate(activity.start_at)}至{toDate(activity.end_at)}
                      </>
                    ) : (
                      '無限期'
                    )}
                  </Text>

                  <Box className="content" mb="4" whiteSpace="pre-wrap">
                    {activity.content}
                    <Box mt="4" display="flex" justifyContent="center">
                      <button
                        type="button"
                        className="primary_btn px-5 "
                        onClick={() => applyActivity(activity.id)}
                      >
                        活动申请
                      </button>
                    </Box>
                  </Box>

                  {/* <button type="button" className="btnbase primary_btn mt-4">
              活动申请
            </button> */}
                </Box>
              </Box>
            )}
          </Box>
        </section>
      </main>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default PromotionDetailPage
