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
          <MemberMenu></MemberMenu>

          <Box className="user-centerContent">
            <Flex alignItems="flex-end" mb="32px">
              <Text fontSize="24px" fontWeight="bold" color="gray.700">
                取款
              </Text>
              {/* <Text fontSize="14px" ml="8px" mb="2px">
                您的提款只需3 - 15 分钟即到账, 若超过30分钟仍未到账，
                请联系客服核查
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
                  中心钱包
                  <Text className="balance">0.00</Text>
                </Flex>
                <button className="outline_btn color-primary">一键回收</button>
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
            <Flex>
              <Stack
                w="346px"
                direction={['column']}
                spacing="15px"
                as="form"
                float="left"
              >
                <Box w="full">
                  <Box className="form-label2">银行卡</Box>
                  {/* <BasicSelect
                    placeholder="选择银行卡"
                    name="bank_id"
                    ref={register({ required: '不可為空' })}
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
                    添加银行卡
                  </Center>
                  <Flex fontSize="14px" alignItems="flex-start" mt="10px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    您还没绑定银行卡，请先绑定一张银行卡
                  </Flex>
                </Box>
                <Box w="full">
                  <Box className="form-label2">取款金额</Box>

                  <input
                    type="text"
                    className="centerInput"
                    style={{ width: '346px' }}
                    placeholder="其他金额"
                  />
                  <Flex fontSize="14px" alignItems="center" mt="10px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    单笔限额：¥500~450,000
                  </Flex>
                </Box>
                <Box w="full">
                  <Box className="form-label2">
                    取款密码
                    <span className="label-right pointer">前往设置</span>
                  </Box>
                  <Flex mb="10px">
                    <input
                      type="text"
                      className="centerInput"
                      style={{ width: '346px' }}
                      placeholder="请输入取款密码"
                    />
                  </Flex>
                </Box>
                <Flex fontSize="15px">
                  今日取款剩余次数：<Text color="brand.500">5</Text>
                </Flex>
                <button
                  className="btnbase primary_btn"
                  style={{ width: '346px' }}
                >
                  立即存款
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
                  您的提款只需3 -
                  15分钟即到账，若超过30分钟仍未到账，请联系客服核查。
                </ListItem>
                <ListItem>
                  只要发起提款，无论结果成功或失败都会计算次数。
                </ListItem>
                <ListItem>
                  此银行卡的开户名必须与您帐号所填写真实姓名一致，否则提款可能会失败。
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
