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
import {
  Spacer,
  Image,
  Input,
  Button,
  Divider,
  flexbox,
} from '@chakra-ui/react'
import {
  Box,
  Center,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/layout'

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
            <Flex w="full">
              <Box className="vip-levelContainer">
                <Box className="vip-num">0</Box>
              </Box>
              <Flex direction="column" ml="16px" justifyContent="center">
                <Text
                  color="brand.500"
                  fontSize="18px"
                  fontWeight="bold"
                  mb="20px"
                >
                  当前等级 : VIP 0
                </Text>
                <Flex w="full">
                  <Flex mr="20px" className="chargeAndFLow" alignItems="center">
                    <Image
                      src="/img/center/ic-vipCharge.png"
                      w="45px"
                      h="45px"
                    ></Image>
                    <Flex
                      direction="column"
                      color="gray.600"
                      fontSize="20px"
                      fontWeight="bold"
                      ml="20px"
                    >
                      0.00
                      <Text color="gray.600" fontSize="14px">
                        累计存款
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mr="20px" className="chargeAndFLow" alignItems="center">
                    <Image
                      src="/img/center/ic-vipFLow.png"
                      w="45px"
                      h="45px"
                    ></Image>
                    <Flex
                      direction="column"
                      color="gray.600"
                      fontSize="20px"
                      fontWeight="bold"
                      ml="20px"
                    >
                      0.00
                      <Text color="gray.600" fontSize="14px">
                        累计流水
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <List className="currGrade" mt="20px">
              <ListItem className="active">
                <i>VIP0</i>
              </ListItem>
              <ListItem>
                <i>VIP1</i>
              </ListItem>
              <ListItem>
                <i>VIP2</i>
              </ListItem>
              <ListItem>
                <i>VIP3</i>
              </ListItem>
              <ListItem>
                <i>VIP4</i>
              </ListItem>
              <ListItem>
                <i>VIP5</i>
              </ListItem>
              <ListItem>
                <i>VIP6</i>
              </ListItem>
              <ListItem>
                <i>VIP7</i>
              </ListItem>
              <ListItem>
                <i>VIP8</i>
              </ListItem>
              <ListItem>
                <i>VIP9</i>
              </ListItem>
              <ListItem>
                <i>VIP10</i>
              </ListItem>
              <Box className="process"></Box>
            </List>
            <Box></Box>
          </Box>
        </Flex>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
