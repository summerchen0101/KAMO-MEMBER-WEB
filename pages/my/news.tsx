import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import PageTabGroup from '@/components/PageTabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { NewsType } from '@/lib/enums'
import { newsTypeOpts } from '@/lib/options'
import { News } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const NewsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(NewsType.System)
  const router = useRouter()
  const { loadingStart, loadingEnd, isLoading } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [news, setNews] = useState<News[]>([])
  const newsGroups = useMemo(() => _.groupBy(news, 'news_type'), [news])
  const [currentNews, setCurrentNews] = useState(
    () => newsGroups[currentTab]?.[0],
  )
  const fetchNews = async () => {
    loadingStart()
    try {
      const res = await API.getNewsList()
      setNews(res.data.list)
    } catch (err) {}
    loadingEnd()
  }
  const handleTabChanged = (tab) => {
    setCurrentTab(tab)
    setCurrentNews(newsGroups[tab]?.[0])
  }
  useEffect(() => {
    fetchNews()
  }, [])
  return (
    <Dashboard>
      <MemberMenu />
      <Box className="menu-content-section">
        <div className="title-col">公告</div>
        <PageTabGroup
          options={newsTypeOpts}
          value={currentTab}
          onChange={handleTabChanged}
        />

        <div className="main-group d-flex ">
          <div className="tab-content left-group w-50">
            <div className="tab-pane active" id="tabs-1" role="tabpanel">
              <ul className="message-inner list-group">
                {!newsGroups[currentTab] && !isLoading && <EmptyHolder />}
                {newsGroups[currentTab]?.map((t, i) => (
                  <li
                    key={i}
                    className={classNames('message-list', {
                      active: t.id === currentNews?.id,
                    })}
                    onClick={() => setCurrentNews(t)}
                  >
                    <div className="message-item">
                      <div className="message-title-col ">
                        <div className="message-title">{t.title}</div>
                        <div className="message-time">
                          {toDate(t.updated_at)}
                        </div>
                      </div>
                      <i className="iconfont allow-right" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-group message-content w-50">
            {currentNews && (
              <>
                <div className="d-flex justify-content-between mb-4">
                  <div className="title">{currentNews.title}</div>
                  <div className="time">{toDate(currentNews.updated_at)}</div>
                </div>
                <p className="text">{currentNews.content}</p>
              </>
            )}
          </div>
        </div>
      </Box>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default NewsPage
