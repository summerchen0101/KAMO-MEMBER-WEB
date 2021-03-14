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
          <MemberMenu></MemberMenu>

          <Box className="user-centerContent">
            <Flex alignItems="flex-end" mb="32px">
              <Text fontSize="24px" fontWeight="bold" color="gray.700">
              银行卡
              </Text>
              <Text fontSize="14px" ml="8px" mb="2px">
              最多支持绑定3张银行卡
              </Text>
            </Flex>
            <Stack direction={['column']} spacing="20px" >



            </Stack>



          </Box>
        </Flex>
      </main>


      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
