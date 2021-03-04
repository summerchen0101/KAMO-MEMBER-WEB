import Dashboard from '@/components/Dashboard'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import NicknamePopup from '@/components/popups/NicknamePopup'
import WechatPopup from '@/components/popups/WechatPopup'
import LinePopup from '@/components/popups/LinePopup'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo } from 'react'
import TelegramPopup from '@/components/popups/TelegramPopup'
import QqPopup from '@/components/popups/QqPopup'
import EmailPopup from '@/components/popups/EmailPopup'
import PhonePopup from '@/components/popups/PhonePopup'
import PassPopup from '@/components/popups/PassPopup'
import TradePassPopup from '@/components/popups/TradePassPopup'
import BankcardListPopup from '@/components/popups/BankcardListPopup'
import _ from 'lodash'
import { Box, Text } from '@chakra-ui/layout'
import BankcardAddPopup from '@/components/popups/BankcardAddPopup'

const ProfilePage: React.FC = () => {
  const router = useRouter()
  const [, setNicknameVisible] = usePopupContext('nickname')
  const [, setWechatVisible] = usePopupContext('wechat')
  const [, setLineVisible] = usePopupContext('line')
  const [, setTelegramVisible] = usePopupContext('telegram')
  const [, setQqVisible] = usePopupContext('qq')
  const [, setEmailVisible] = usePopupContext('email')
  const [, setPhoneVisible] = usePopupContext('phone')
  const [, setPassVisible] = usePopupContext('pass')
  const [, setTradePassVisible] = usePopupContext('tradePass')
  const [, setBankcardVisible] = usePopupContext('bankcardList')
  const [, setBankcardAddVisible] = usePopupContext('bankcardAdd')
  const API = useRequest()
  const { fetchUserContact, fetchUserInfo, fetchMemberBankList } = useService()
  const { userContact, user, bankcards } = useGlobalProvider()
  const defaultBankcard = useMemo(() => bankcards.find((t) => t.is_default), [
    bankcards,
  ])

  useEffect(() => {
    Promise.all([fetchUserInfo(), fetchUserContact(), fetchMemberBankList()])
  }, [])
  return (
    <Dashboard>
      <MemberMenu>
        <Box className="menu-content-section">
          <div className="title-col mb-4">个人资料</div>
          <table className="profile">
            <tbody>
              <tr>
                <td>昵称</td>
                <td>{user?.name}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setNicknameVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>真实姓名</td>
                <td>{userContact?.name}</td>
                <td>
                  <div
                    className="mini_btn"
                    // onClick={() => setNicknameVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>电子邮箱</td>
                <td>{userContact?.email}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setEmailVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>手机号码</td>
                <td>{userContact?.mobile}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setPhoneVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>微信</td>
                <td>{userContact?.wechat_id}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setWechatVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>QQ</td>
                <td>{userContact?.qq_id}</td>
                <td>
                  <div className="mini_btn" onClick={() => setQqVisible(true)}>
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>Line</td>
                <td>{userContact?.line_id}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setLineVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>Telegram</td>
                <td>{userContact?.telegram_id}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setTelegramVisible(true)}
                  >
                    修改
                  </div>
                </td>
              </tr>
              <tr>
                <td>预设银行卡</td>
                <td>
                  <Text>
                    {defaultBankcard?.name} (***
                    {_.takeRight(defaultBankcard?.acc, 4)})
                  </Text>
                </td>
                <td>
                  {bankcards.length < 3 && (
                    <div
                      className="mini_btn"
                      onClick={() => setBankcardAddVisible(true)}
                    >
                      新增
                    </div>
                  )}
                  <div
                    className="mini_btn"
                    onClick={() => setBankcardVisible(true)}
                  >
                    设置
                  </div>
                </td>
              </tr>
              <tr>
                <td>登入密码</td>
                <td></td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setPassVisible(true)}
                  >
                    设定
                  </div>
                </td>
              </tr>
              <tr>
                <td>提领密码</td>
                <td></td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setTradePassVisible(true)}
                  >
                    设定
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </MemberMenu>
      <NicknamePopup />
      <WechatPopup />
      <LinePopup />
      <TelegramPopup />
      <QqPopup />
      <EmailPopup />
      <PhonePopup />
      <PassPopup />
      <TradePassPopup />
      <BankcardListPopup />
      <BankcardAddPopup />

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
