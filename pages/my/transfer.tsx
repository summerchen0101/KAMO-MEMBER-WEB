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
        title: '??????',
        description: '????????????????????????????????????????????????',
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
                ??????
              </Text>
              <Text fontSize="14px" ml="8px" mb="2px">
                ????????????????????????????????????????????????
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
                    ????????????
                    <Text className="balance">0.00</Text>
                  </Flex>
                  <button className="outline_btn color-primary">
                    ????????????
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
                    ????????????
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
                    ??????????????????
                  </Text>
                  <Text fontSize="13px">??????????????????????????????</Text>
                </Box>
                <Switch size="lg" colorScheme="brand" />
              </Center>
            </Stack>

            <Stack w="full">
              <Box className="section-title color-red ">????????????</Box>
              <List className="walletlist">
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">KAMO??????</Box>
                    <Spacer />
                    <Box className="actionBtn">????????????</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      ??????
                    </Box>
                    <Box className="transToggle">??????</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">IM??????</Box>
                    <Spacer />
                    <Box className="actionBtn">????????????</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      ??????
                    </Box>
                    <Box className="transToggle">??????</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">BB??????</Box>
                    <Spacer />
                    <Box className="actionBtn">????????????</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      ??????
                    </Box>
                    <Box className="transToggle">??????</Box>
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex alignItems="flex-start">
                    <Box className="clientName">????????????</Box>
                    <Spacer />
                    <Box className="actionBtn">????????????</Box>
                  </Flex>
                  <Box className="money">0.00</Box>
                  <Flex justifyContent="flex-end">
                    <Box className="transToggle" mr="10px">
                      ??????
                    </Box>
                    <Box className="transToggle">??????</Box>
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
              <Box className="section-title color-blue">????????????</Box>
              <Flex w="full" alignItems="center" mb="10px">
                <BasicSelect
                  w="220px"
                  placeholder="????????????"
                  ref={register({ required: '????????????' })}
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
                  placeholder="KAMO??????"
                  ref={register({ required: '????????????' })}
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
                  ???????????????????????????????????????????????????????????????????????????
                </Flex>
              </Flex>
              <Flex w="full">
                <Box className="centerInput-wraper" w="490px" mr="20px">
                  <input
                    type="text"
                    className="centerInput"
                    placeholder="?????????????????????"
                  />
                  <Box className="righText">????????????</Box>
                </Box>
                <button
                  className="btnbase primary_btn"
                  style={{ width: '180px' }}
                >
                  ????????????
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
