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
import { Spacer, Image, Input, Button, Divider } from '@chakra-ui/react'
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/layout'

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
      <main className="user-main">
        <Flex className="laout">
          <MemberMenu />

          <Box className="user-centerContent">
            <Flex alignItems="flex-end" mb="32px">
              <Text fontSize="24px" fontWeight="bold" color="gray.700">
                ????????????
              </Text>
              <Text fontSize="14px" ml="8px" mb="2px">
                ????????????????????????????????????????????????????????????????????????????????????
              </Text>
            </Flex>
            <Stack direction={['column']} spacing="20px" as="form">
              <Box className="section-title color-blue">????????????</Box>
              <Flex alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <input
                  type="text"
                  className="centerInput"
                  style={{ width: '346px' }}
                  placeholder="??????????????????????????????????????????????????????????????????"
                />
              </Flex>
              <Flex alignItems="center">
                <Box className="centerLabel">??????</Box>
                <Box w="163px" mr="20px" className="gender active">
                  ???
                </Box>{' '}
                <Box className="gender" w="163px">
                  ???
                </Box>
              </Flex>
              <Flex alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <input
                  type="text"
                  className="centerInput"
                  style={{ width: '346px' }}
                  placeholder="??????????????????????????????18??????"
                />
              </Flex>
              <Flex alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <Text>2020-12-23 10:26:51</Text>
              </Flex>
              <button
                className="btnbase primary_btn"
                style={{ width: '190px', margin: '16px 0 20px 82px' }}
              >
                ??????
              </button>
            </Stack>

            <Divider
              orientation="horizontal"
              borderColor="divider.500"
              m="8px 0"
            ></Divider>
            <Stack direction={['column']} spacing="20px" mt="20px">
              <Box className="section-title color-red">????????????</Box>
              <Flex w="428px" alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <Text fontSize="15px" color="red.500">
                  ?????????
                </Text>
                <Spacer />
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px' }}
                >
                  ??????
                </button>
              </Flex>
              <Flex w="428px" alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <Text fontSize="15px" color="blue.500">
                  ?????????
                </Text>
                <Spacer />
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px' }}
                >
                  ??????
                </button>
              </Flex>
              <Flex w="428px" alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <Text fontSize="15px">******</Text>
                <Spacer />
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px' }}
                  onClick={() => setPassVisible(true)}
                >
                  ??????
                </button>
              </Flex>
              {/* <Flex w="428px" alignItems="center">
                <Box className="centerLabel">?????????</Box>
                <Text fontSize="15px" color="red.500">
                  ?????????
                </Text>
                <Spacer />
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px' }}
                >
                  ??????
                </button>
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px', margin: '0 0 0 10px' }}
                >
                  ??????
                </button>
              </Flex> */}
              <Flex w="428px" alignItems="center">
                <Box className="centerLabel">????????????</Box>
                <Text fontSize="15px" color="red.500">
                  ?????????
                </Text>
                <Spacer />
                <button
                  className="
                  outline_btn color-primary "
                  style={{ width: '90px' }}
                  onClick={() => setTradePassVisible(true)}
                >
                  ??????
                </button>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </main>

      {/* <MemberMenu>
        <Box className="menu-content-section">
          <div className="title-col mb-4">????????????</div>
          <table className="profile">
            <tbody>
              <tr>
                <td>??????</td>
                <td>{user?.name}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setNicknameVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>????????????</td>
                <td>{userContact?.name}</td>
                <td>
                  <div
                    className="mini_btn"
                    // onClick={() => setNicknameVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>????????????</td>
                <td>{userContact?.email}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setEmailVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>????????????</td>
                <td>{userContact?.mobile}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setPhoneVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>??????</td>
                <td>{userContact?.wechat_id}</td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setWechatVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>QQ</td>
                <td>{userContact?.qq_id}</td>
                <td>
                  <div className="mini_btn" onClick={() => setQqVisible(true)}>
                    ??????
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
                    ??????
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
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>???????????????</td>
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
                      ??????
                    </div>
                  )}
                  <div
                    className="mini_btn"
                    onClick={() => setBankcardVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>????????????</td>
                <td></td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setPassVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
              <tr>
                <td>????????????</td>
                <td></td>
                <td>
                  <div
                    className="mini_btn"
                    onClick={() => setTradePassVisible(true)}
                  >
                    ??????
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </MemberMenu> */}
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
