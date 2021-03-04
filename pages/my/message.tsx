import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import PageTabGroup from '@/components/PageTabGroup'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { newsTypeOpts } from '@/lib/options'
import { Message } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useTransfer from '@/utils/useTransfer'
import { Box, Divider } from '@chakra-ui/layout'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'

const MessagePage: React.FC = () => {
  const router = useRouter()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd, isLoading } = useLoaderProvider()
  const API = useRequest()
  const { toDate } = useTransfer()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState<Message>()
  const fetchMessages = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getMessageList()
      setMessages(res.data.list)
      setCurrentMessage(res.data.list[0])
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }
  useEffect(() => {
    fetchMessages()
  }, [])
  return (
    <Dashboard>
      <MemberMenu>
        <Box className="menu-content-section">
          <div className="title-col">站内信</div>
          <Divider color="gray.200" mt="4" />
          <div className="main-group d-flex">
            <div className="tab-content left-group w-50">
              <div className="tab-pane active" id="tabs-1" role="tabpanel">
                <ul
                  className="message-inner list-group"
                  style={{ height: '611px' }}
                >
                  {!messages && !isLoading && <EmptyHolder />}
                  {messages?.map((t, i) => (
                    <li
                      key={i}
                      className={classNames('message-list', {
                        active: t.id === currentMessage?.id,
                      })}
                      onClick={() => setCurrentMessage(t)}
                    >
                      <div className="message-item">
                        <div className="message-title-col ">
                          <div className="message-title">{t.title}</div>
                          <div className="message-time">
                            {toDate(t.created_at)}
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
              {currentMessage && (
                <>
                  <div className="d-flex justify-content-between mb-4">
                    <div className="title">{currentMessage.title}</div>
                    <div className="time">
                      {toDate(currentMessage.created_at)}
                    </div>
                  </div>
                  <p className="text">{currentMessage.content}</p>
                </>
              )}
            </div>
          </div>
        </Box>
      </MemberMenu>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default MessagePage
