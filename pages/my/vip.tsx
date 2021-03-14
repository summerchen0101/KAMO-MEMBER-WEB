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
import BasicTable, { ColumnType } from '@/components/BasicTable'

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

  // const columns = [
  //   { title: 'VIP等级', render: (_, row) => row.name },
  //   { title: 'VIP0', render: (_, row) => row.level0 },
  //   { title: 'VIP1', render: (_, row) => row.level1 },
  //   { title: 'VIP2', render: (_, row) => row.level2 },
  //   { title: 'VIP3', render: (_, row) => row.level3 },
  //   { title: 'VIP4', render: (_, row) => row.level4 },
  //   { title: 'VIP5', render: (_, row) => row.level5 },
  //   { title: 'VIP6', render: (_, row) => row.level6 },
  //   { title: 'VIP7', render: (_, row) => row.level7 },
  //   { title: 'VIP8', render: (_, row) => row.level8 },
  //   { title: 'VIP9', render: (_, row) => row.level9 },
  //   { title: 'VIP10', render: (_, row) => row.level10 },
  // ]

  // const data = [
  //   { name: 'KAMO體育', level0: '0.48%', level1: '0.48%', level2: '0.48%', level3: '0.48%', level4: '0.48%' , level5: '0.48%', level6: '0.48%', level7: '0.48%', level8: '0.48%', level9: '0.48%', level10: '0.48%'},
  // ]
  useEffect(() => {
    Promise.all([fetchUserInfo(), fetchUserContact(), fetchMemberBankList()])
  }, [])
  return (
    <Dashboard>
      <main className="user-main">
        <Flex className="laout">
          <MemberMenu></MemberMenu>

          <Stack
            className="user-centerContent"
            direction={['column']}
            spacing="20px"
          >
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
            <List className="currGrade">
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

            <Box className="nextGrade" fontSize="14px">
              <Text
                color="brand.500"
                mb="5px"
                fontSize="18px"
                fontWeight="bold"
              >
                距离下一等级：VIP1
              </Text>
              <Flex mb="5px">
                <Flex w="50%">
                  存款还需金额约:
                  <Text color="gray.700" ml="10px">
                    500.00
                  </Text>
                </Flex>

                <Flex W="50%">
                  流水还需金额约:
                  <Text color="gray.700" ml="10px">
                    3,000.00
                  </Text>
                </Flex>
              </Flex>
              <Text>
                当前累计存款和累计流水截止2021年03月02日09时54分（每日16点更新）
              </Text>
            </Box>

            <Box className="section-title color-blue">VIP0尊享</Box>
            <List className="currGradeEnjoy">
              <ListItem>
                <Box className="iconBox ic-depositCount"></Box>
                <Text>每日提款次数</Text>
                <Text>5</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-withdrawlAmount"></Box>
                <Text>每日提款额度</Text>
                <Text>200,000</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-upgrade"></Box>
                <Text>
                  升级礼金<br></br>(晋级自动发放)
                </Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-birthday "></Box>
                <Text>生日礼金</Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-redeEvelope"></Box>
                <Text>
                  每月红包<br></br>(1号和15号可领取)
                </Text>
                <Text>0</Text>
              </ListItem>
              <ListItem>
                <Box className="iconBox ic-commission "></Box>
                <Text>最高返水</Text>
                <Text>0.08%</Text>
              </ListItem>
            </List>
            <Box className="section-title color-primary">VIP最高返水比例</Box>
            {/* <BasicTable columns={columns} data={data}/> */}

            <table className="vipDiscount">
              <tr>
                <th>VIP等级</th>
                <th>VIP0</th>
                <th>VIP1</th>
                <th>VIP2</th>
                <th>VIP3</th>
                <th>VIP4</th>
                <th>VIP5</th>
                <th>VIP6</th>
                <th>VIP7</th>
                <th>VIP8</th>
                <th>VIP9</th>
                <th>VIP10</th>
              </tr>
              <tr>
                <td>KAMO體育</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
                <td>0.48%</td>
              </tr>

            </table>
          </Stack>
        </Flex>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default ProfilePage
