import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { gameStatusOpts } from '@/lib/options'
import { Score } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box, Text } from '@chakra-ui/layout'
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { Fade } from '@chakra-ui/transition'
import React, { useEffect, useState } from 'react'

const scores: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('thisWeek')
  const [scores, setScores] = useState<Score[]>([])
  const [isEmpty, setIsEmpty] = useState(false)
  const { isLoading, loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const { toOptionName, toDateTime } = useTransfer()
  const fetchScores = async () => {
    loadingStart()
    try {
      const res = await API.getScoreList()
      setScores(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchScores()
    const interval = setInterval(fetchScores, 1000 * 30)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Dashboard>
      <main className="main">
        <section className="detail">
          <Box className="detail-box laout">
            <Box className="title-col" mt="4">
              即时比分
            </Box>
            <Fade in={!isLoading}>
              <Box mt="15px">
                {!isEmpty ? (
                  <Table
                    variant="striped"
                    borderRadius="4px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    <Thead bg="brand.500">
                      <Tr>
                        <Th fontSize="md" color="#fff" lineHeight="21px">
                          開賽
                        </Th>
                        <Th fontSize="md" color="#fff" lineHeight="21px">
                          聯盟
                        </Th>
                        <Th fontSize="md" color="#fff" lineHeight="21px">
                          对阵
                        </Th>
                        <Th fontSize="md" color="#fff" lineHeight="21px">
                          全場
                        </Th>
                        <Th fontSize="md" color="#fff" lineHeight="21px">
                          半場
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {scores.map((t, i) => (
                        <Tr
                          key={i}
                          background="#fafafa"
                          fontSize="15px"
                          _even={{ background: '#fafafa' }}
                          _odd={{ background: '#fafafa' }}
                        >
                          <Td padding=".8rem 1.5rem">
                            {t.play_time}
                            <br />
                            {toOptionName(gameStatusOpts, t.game_status)}
                          </Td>
                          <Td padding=".8rem 1.5rem" verticalAlign="middle">
                            {t.league}
                          </Td>
                          <Td padding=".8rem 1.5rem">
                            <Text>{t.home_team} (主)</Text>
                            <Text>{t.away_team}</Text>
                          </Td>
                          <Td padding=".8rem 1.5rem">
                            <Text color={t.home_score > t.away_score && 'red'}>
                              {t.home_score}
                            </Text>
                            <Text color={t.away_score > t.home_score && 'red'}>
                              {t.away_score}
                            </Text>
                          </Td>
                          <Td padding=".8rem 1.5rem">
                            <Text
                              color={
                                t.home_half_score > t.away_half_score && 'red'
                              }
                            >
                              {t.home_half_score}
                            </Text>
                            <Text
                              color={
                                t.away_half_score > t.home_half_score && 'red'
                              }
                            >
                              {t.away_half_score}
                            </Text>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <EmptyHolder />
                )}

                {/* <Paginator /> */}
              </Box>
            </Fade>
          </Box>
        </section>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default scores
