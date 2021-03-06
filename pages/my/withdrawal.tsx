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
import { Image, ListItem, List } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Input } from '@chakra-ui/input'
import {
  Box,
  Divider,
  Text,
  Flex,
  Stack,
  Spacer,
  Center,
} from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineDuplicate } from 'react-icons/hi'

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
              {/* <Text fontSize="14px" ml="8px" mb="2px">
                ??????????????????3 - 15 ???????????????, ?????????30?????????????????????
                ?????????????????????
              </Text> */}
            </Flex>

            <Box className="account-container" mb="20px">
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
                <button className="outline_btn color-primary">????????????</button>
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
            <Flex>
              <Stack
                w="346px"
                direction={['column']}
                spacing="15px"
                as="form"
                float="left"
              >
                <Box w="full">
                  <Box className="form-label2">?????????</Box>
                  {/* <BasicSelect
                    placeholder="???????????????"
                    name="bank_id"
                    ref={register({ required: '????????????' })}
                    options={bankcardOpts.map((t, i) => ({
                      label: t.name,
                      value: t.id,
                    }))}
                  />
                  <FieldValidateMessage error={errors.bank_id} /> */}
                  <Center
                    w="346px"
                    h="40px"
                    color="brand.500"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="border.500"
                    borderRadius="4px"
                    cursor="pointer"
                  >
                    <Box className="iconfont ic-add" mr="4px"></Box>
                    ???????????????
                  </Center>
                  <Flex fontSize="14px" alignItems="flex-start" mt="10px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    ??????????????????????????????????????????????????????
                  </Flex>
                </Box>
                <Box w="full">
                  <Box className="form-label2">????????????</Box>

                  <input
                    type="text"
                    className="centerInput"
                    style={{ width: '346px' }}
                    placeholder="????????????"
                  />
                  <Flex fontSize="14px" alignItems="center" mt="10px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    ?????????????????500~450,000
                  </Flex>
                </Box>
                <Box w="full">
                  <Box className="form-label2">
                    ????????????
                    <span className="label-right pointer">????????????</span>
                  </Box>
                  <Flex mb="10px">
                    <input
                      type="text"
                      className="centerInput"
                      style={{ width: '346px' }}
                      placeholder="?????????????????????"
                    />
                  </Flex>
                </Box>
                <Flex fontSize="15px">
                  ???????????????????????????<Text color="brand.500">5</Text>
                </Flex>
                <button
                  className="btnbase primary_btn"
                  style={{ width: '346px' }}
                >
                  ????????????
                </button>
              </Stack>

              <List
                fontSize="14px"
                lineHeight="28px"
                m="0 0 0 40px"
                w="518px"
                float="right"
                p="10px 20px 20px"
                color="gray.600"
              >
                <ListItem>
                  ??????????????????3 -
                  15???????????????????????????30?????????????????????????????????????????????
                </ListItem>
                <ListItem>
                  ?????????????????????????????????????????????????????????????????????
                </ListItem>
                <ListItem>
                  ??????????????????????????????????????????????????????????????????????????????????????????????????????
                </ListItem>
              </List>
            </Flex>
          </Box>
        </Flex>
      </main>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default WithdrawPage
