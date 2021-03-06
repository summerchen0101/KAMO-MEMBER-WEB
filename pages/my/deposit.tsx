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
import { newsTypeOpts, paywayOpts, processStatusOpts } from '@/lib/options'
import pattern from '@/lib/pattern'
import { Message, Withdraw } from '@/lib/types'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Input } from '@chakra-ui/input'
import { Box, Center, Divider, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import classNames from 'classnames'
import _ from 'lodash'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import { Flex, Spacer, Stack } from '@chakra-ui/react'

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
              <Text fontSize="14px" ml="8px" mb="2px">
                ???????????????????????????
              </Text>
            </Flex>
            <Stack direction={['column']} spacing="15px" as="form">
              <Box className="checkbox-container">
                <label className="form-label2">????????????</label>

                <Box w="133px" height="85px" className="active">
                  ????????????
                </Box>
                <Box w="133px" height="85px">
                  ???????????????
                </Box>
                <Box w="133px" height="85px">
                  ???????????????
                </Box>
                <Box w="133px" height="85px">
                  ???????????????
                </Box>
                <Box w="133px" height="85px">
                  ???????????????
                </Box>
              </Box>
              <Box>
                <Box className="form-label2">???????????????</Box>
                <Flex>
                  <input
                    type="text"
                    className="centerInput"
                    style={{ width: '346px' }}
                    placeholder="????????????????????????"
                  />
                  <Flex fontSize="14px" alignItems="center" ml="20px">
                    <Box
                      className="ic-error iconfont"
                      color="brand.500"
                      mr="4px"
                    ></Box>
                    ?????????????????????????????????????????????????????????
                  </Flex>
                </Flex>
              </Box>
              <Box className="checkbox-container">
                <label className="form-label2">????????????</label>
                <Box w="133px" height="40px" className="active">
                  ??105
                </Box>
                <Box w="133px" height="40px">
                  ??105
                </Box>
                <Box w="133px" height="40px">
                  ??105
                </Box>
                <Box w="133px" height="40px">
                  ??105
                </Box>
                <Box w="133px" height="40px">
                  ??105
                </Box>
              </Box>
              <Flex mb="10px">
                <input
                  type="text"
                  className="centerInput"
                  style={{ width: '346px' }}
                  placeholder="????????????"
                />
                <Flex fontSize="14px" alignItems="center" ml="20px">
                  <Box
                    className="ic-error iconfont"
                    color="brand.500"
                    mr="4px"
                  ></Box>
                  ?????????????????????100.00???-500.00???
                </Flex>
              </Flex>
              <button
                className="btnbase primary_btn"
                style={{ width: '346px' }}
              >
                ????????????
              </button>
            </Stack>
          </Box>
        </Flex>
      </main>
      {/* <MemberMenu>
        <Box className="menu-content-section">
          <div className="title-col">????????????</div>
          <Divider color="gray.200" mt="4" />
          <div className="mian-group mt-4 d-flex">
            <form className="left-group" onSubmit={onSubmit}>
              <FormControl className="form-group">
                <label className="form-label2">????????????</label>
                <BasicSelect
                  placeholder="??????????????????"
                  name="bank_id"
                  ref={register({ required: '????????????' })}
                  options={paywayOpts}
                />
                <FieldValidateMessage error={errors.bank_id} />
              </FormControl>

              <FormControl className="form-group">
                <label className="form-label2">????????????</label>
                <Input
                  type="number"
                  className="form-input"
                  placeholder="?????????????????????"
                  name="amount"
                  ref={register({
                    required: '????????????',
                    pattern: {
                      value: pattern.positiveInt,
                      message: '????????????',
                    },
                  })}
                />
                <FieldValidateMessage error={errors.amount} />
              </FormControl>

              <FormControl className="form-group">
                <label className="form-label2">
                  ????????????
                  <Text
                    float="right"
                    fontSize="sm"
                    color="brand.500"
                    cursor="pointer"
                    onClick={() => router.push('/my/profile')}
                  >
                    ????????????
                  </Text>
                </label>
                <Input
                  type="password"
                  className="form-input"
                  name="sec_pass"
                  placeholder="?????????????????????"
                  ref={register({
                    required: '????????????',
                    minLength: { value: 4, message: '????????????' },
                    maxLength: { value: 12, message: '????????????' },
                  })}
                />
                <FieldValidateMessage error={errors.sec_pass} />
              </FormControl>

              <div className="w-100 my-4">
                ????????????:
                <span className="text-blue ml-3">?? {watch('amount') || 0}</span>
              </div>
              <button type="submit" className="btnbase primary_btn mt-4">
                ????????????
              </button>
            </form>
            <div className="right-group">
              <label className="form-label2">??????????????????</label>
              <div className="list-container">
                {withdraws.map((t, i) => (
                  <div key={i} className="list-item">
                    <div className="list-title">
                      ????????????{' '}
                      <span>
                        {t.sn}{' '}
                        <Box
                          className="copy iconfont"
                          display="inline-block"
                          float="right"
                          fontSize="18px"
                          marginLeft="5px"
                          _hover={{ color: 'brand.500' }}
                          onClick={() => copyToClipboard(t.sn)}
                          cursor="pointer"
                        ></Box>
                      </span>
                    </div>
                    <div className="list-title">
                      ???????????? <span>{toDateTime(t.created_at)}</span>
                    </div>
                    <div className="list-title">
                      ???????????? <span className="text-red">{t.amount}</span>
                    </div>
                    <div className="list-title">
                      ????????????{' '}
                      <span>{toOptionName(processStatusOpts, t.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="pointer mt-3 more-btn"
                onClick={() => router.push('/my/trade/withdraw-record')}
              >
                ????????????
                <i className="iconfont allow-right" />
              </div>
            </div>
          </div>
        </Box>
      </MemberMenu> */}
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default WithdrawPage
