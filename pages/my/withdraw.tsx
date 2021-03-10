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
import { Input } from '@chakra-ui/input'
import { Box, Divider, Text, Flex, Stack } from '@chakra-ui/layout'
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
              <Text fontSize="14px" ml="8px" mb="2px">
                您的提款只需3 - 15 分钟即到账, 若超过30分钟仍未到账，
                请联系客服核查
              </Text>
            </Flex>
            <Stack direction={['column']} spacing="20px" as="form">
              <Box className="checkbox-container">
                <label className="form-label2">支付方式</label>
                <Box w="133px" height="85px" className="active">
                  网银转账
                </Box>
                <Box w="133px" height="85px">
                  虚拟币充值
                </Box>
                <Box w="133px" height="85px">
                  银行卡转卡
                </Box>
                <Box w="133px" height="85px">
                  银行卡转卡
                </Box>
                <Box w="133px" height="85px">
                  银行卡转卡
                </Box>
              </Box>
              <Box>
                <Box className="form-label2">汇款人姓名</Box>
                <Flex>
                  <input
                    type="text"
                    className="centerformIinput"
                    style={{ width: '346px' }}
                    placeholder="请输入汇款人姓名"
                  />
                  <Flex fontSize="14px" alignItems="center" ml="20px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    为及时到账，请务必输入正确的存款人姓名
                  </Flex>
                </Flex>
              </Box>
              <Box className="checkbox-container">
                <label className="form-label2">存款金额</label>
                <Box w="133px" height="40px" className="active">
                  ¥105
                </Box>
                <Box w="133px" height="40px">
                  ¥105
                </Box>
                <Box w="133px" height="40px">
                  ¥105
                </Box>
                <Box w="133px" height="40px">
                  ¥105
                </Box>
                <Box w="133px" height="40px">
                  ¥105
                </Box>
              </Box>
              <Flex mb="10px">
                <input
                  type="text"
                  className="centerformIinput"
                  style={{ width: '346px' }}
                  placeholder="其他金额"
                />
                <Flex fontSize="14px" alignItems="center" ml="20px">
                  <Box
                    className="ic-error iconfont"
                    color="brand.500"
                    mr="4px"
                  ></Box>
                  单笔存款金额：100.00元-500.00元
                </Flex>
              </Flex>
              <button
                className="btnbase primary_btn"
                style={{ width: '346px' }}
              >
                立即存款
              </button>
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
