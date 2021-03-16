import BasicSelect from '@/components/BasicSelect'
import Dashboard from '@/components/Dashboard'
import EmptyHolder from '@/components/EmptyHolder'
import FieldValidateMessage from '@/components/FieldValidateMessage'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import MemberMenu from '@/components/MemberMenu'
import PageTabGroup from '@/components/PageTabGroup'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { newsTypeOpts, processStatusOpts } from '@/lib/options'
import pattern from '@/lib/pattern'
import { Message, Withdraw } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Image, Select, Switch } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import {
  Box,
  Divider,
  Text,
  Flex,
  Stack,
  Spacer,
  Center,
  List,
  ListItem,
} from '@chakra-ui/layout'

import { useToast } from '@chakra-ui/toast'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineDuplicate } from 'react-icons/hi'
import { MdArrowDropDown } from 'react-icons/md'

type FormProps = {
  bank_id: number
  amount: number
  sec_pass: string
}
const WithdrawPage: React.FC = () => {
  const router = useRouter()
  const API = useRequest()
  const toast = useToast()
  const { fetchUserInfo, fetchBankCardOpts } = useService()
  const { bankcardOpts } = useGlobalProvider()
  const { register, handleSubmit, errors, watch, reset } = useForm<FormProps>()
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd, isLoading } = useLoaderProvider()
  const [withdraws, setWithdraws] = useState<Withdraw[]>([])
  const { toCurrency, toDateTime, toOptionName } = useTransfer()
  const { copyToClipboard } = useHelper()

  const fetchWithdraws = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getWithdrawList({ perpage: 5, page: 1 })
      setWithdraws(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.createWithdraw({
        bank_id: +d.bank_id,
        amount: +d.amount,
        sec_pass: d.sec_pass,
      })
      reset()
      fetchWithdraws()
      toast({
        status: 'success',
        title: '提领',
        description: '提领申请已送出，将尽快为您处理！',
      })
    } catch (err) {}
  })

  useEffect(() => {
    Promise.all([fetchBankCardOpts(), fetchUserInfo(), fetchWithdraws()])
  }, [])
  return (
    <Dashboard>
      <main className="user-main">
        <Flex className="laout">
          <MemberMenu />

          <Box className="user-centerContent">
            <Flex alignItems="flex-end" mb="32px">
              <Text fontSize="24px" fontWeight="bold" color="gray.700">
                转账
              </Text>
              <Text fontSize="14px" ml="8px" mb="2px">
                场馆钱包和场馆钱包之间不可以互转
              </Text>
            </Flex>
            <Stack w="full" direction={['row']} spacing="20px">
              <Box className="account-container" mb="20px" w="634px">
                <Box>
                  <Image
                    w="45px"
                    h="45px"
                    mr="10px"
                    src="/img/center/ic-transferWallet.png"
                  ></Image>
                  <Flex flexDir="column">
                    中心钱包
                    <Text className="balance">0.00</Text>
                  </Flex>
                  <button className="outline_btn color-primary">
                    一键回收
                  </button>
                </Box>
                <Divider orientation="vertical" h="60%" />
                <Box>
                  <Image
                    w="45px"
                    h="45px"
                    mr="10px"
                    src="/img/center/ic-transferLock.png"
                  ></Image>
                  <Flex flexDir="column">
                    锁定钱包
                    <Text className="balance">0.00</Text>
                  </Flex>
                </Box>
              </Box>
              <Center
                w="250px"
                h="90px"
                borderWidth="1px"
                borderColor="divider.500"
                borderStyle="solid"
                borderRadius="4px"
              >
                <Box mr="10px">
                  <Text color="brand.500" fontSize="15px" mb="2px">
                    免转钱包模式
                  </Text>
                  <Text fontSize="13px">余额自动转入游戏场馆</Text>
                </Box>
                <Switch size="lg" colorScheme="brand" />
              </Center>
            </Stack>

            <Stack w="full">
              <Box className="section-title color-red ">场馆钱包</Box>
              <List className="walletlist">
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">KAMO体育</Box>
                    <Spacer />
                    <Box className="actionBtn">一键转入</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      转入
                    </Box>
                    <Box className="transToggle">转出</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">IM体育</Box>
                    <Spacer />
                    <Box className="actionBtn">一键转入</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      转入
                    </Box>
                    <Box className="transToggle">转出</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">BB体育</Box>
                    <Spacer />
                    <Box className="actionBtn">一键转入</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      转入
                    </Box>
                    <Box className="transToggle">转出</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">沙巴体育</Box>
                    <Spacer />
                    <Box className="actionBtn">一键转入</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      转入
                    </Box>
                    <Box className="transToggle">转出</Box>
                  </Flex>
                </ListItem>
              </List>
            </Stack>
            <Divider
              orientation="horizontal"
              borderColor="divider.500"
              m="8px 0"
            ></Divider>
            <Stack w="full" direction={['column']} as="form">
              <Box className="section-title color-blue">转账金额</Box>
              <Flex w="full" alignItems="center" mb="10px">
                <BasicSelect
                  w="220px"
                  placeholder="中心钱包"
                  ref={register({ required: '不可為空' })}
                  options={bankcardOpts.map((t, i) => ({
                    label: t.name,
                    value: t.id,
                  }))}
                />

                <Center
                  w="30px"
                  h="30px"
                  m="0 10px"
                  fontSize="28px"
                  cursor="pointer"
                  _hover={{ color: 'brand.500' }}
                  className="ic-round-transfer iconfont"
                ></Center>
                <BasicSelect
                  w="220px"
                  placeholder="KAMO体育"
                  ref={register({ required: '不可為空' })}
                  options={bankcardOpts.map((t, i) => ({
                    label: t.name,
                    value: t.id,
                  }))}
                />
                <Flex fontSize="14px" ml="20px">
                  <Box
                    className="ic-error iconfont"
                    color="brand.500"
                    mr="4px"
                  ></Box>
                  如平台維護出现无法转入或转出，有任何疑问请联系客服
                </Flex>
              </Flex>
              <Flex w="full">
                <Box className="centerInput-wraper" w="490px" mr="20px">
                  <input
                    type="text"
                    className="centerInput"
                    placeholder="请输入转账金额"
                  />
                  <Box className="righText">最大金额</Box>
                </Box>
                <button
                  className="btnbase primary_btn"
                  style={{ width: '180px' }}
                >
                  立即存款
                </button>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </main>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default WithdrawPage
