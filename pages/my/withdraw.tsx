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
import { Box, Divider, Text } from '@chakra-ui/layout'
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
      <MemberMenu>
        <Box className="menu-content-section">
          <div className="title-col">立即提领</div>
          <Divider color="gray.200" mt="4" />
          <div className="mian-group mt-4 d-flex">
            <form className="left-group" onSubmit={onSubmit}>
              <FormControl className="form-group">
                <label className="form-label2">
                  銀行卡
                  <Text
                    float="right"
                    fontSize="sm"
                    color="brand.500"
                    cursor="pointer"
                    onClick={() => router.push('/my/profile')}
                  >
                    前往设定
                  </Text>
                </label>
                <BasicSelect
                  placeholder="选择银行卡"
                  name="bank_id"
                  ref={register({ required: '不可為空' })}
                  options={bankcardOpts.map((t, i) => ({
                    label: t.name,
                    value: t.id,
                  }))}
                />
                <FieldValidateMessage error={errors.bank_id} />
              </FormControl>

              <FormControl className="form-group">
                <label className="form-label2">提领金额</label>
                <Input
                  type="number"
                  className="form-input"
                  placeholder="請輸入提領金額"
                  name="amount"
                  ref={register({
                    required: '不可為空',
                    pattern: {
                      value: pattern.positiveInt,
                      message: '格式有誤',
                    },
                  })}
                />
                <FieldValidateMessage error={errors.amount} />
              </FormControl>

              <FormControl className="form-group">
                <label className="form-label2">
                  提领密码
                  <Text
                    float="right"
                    fontSize="sm"
                    color="brand.500"
                    cursor="pointer"
                    onClick={() => router.push('/my/profile')}
                  >
                    前往设定
                  </Text>
                </label>
                <Input
                  type="password"
                  className="form-input"
                  name="sec_pass"
                  placeholder="请输入提领密码"
                  ref={register({
                    required: '不可為空',
                    minLength: { value: 4, message: '格式不符' },
                    maxLength: { value: 12, message: '格式不符' },
                  })}
                />
                <FieldValidateMessage error={errors.sec_pass} />
              </FormControl>

              {/* <div class="background-gray row m-0 py-3">
                              <div class="col-6 mb-2">手续费: <span class="ml-3">0</span></div>
                              <div class="col-6 mb-2">行政费: <span class="ml-3">0</span></div>
                              <div class="col-6">补充存款优惠: <span class="ml-3">0</span></div>
                              <div class="col-6">实际到账:<span class="text-blue ml-3">0</span></div>
                          </div> */}
              <div className="w-100 my-4">
                提领金额:
                <span className="text-blue ml-3">¥ {watch('amount') || 0}</span>
              </div>
              <button type="submit" className="btnbase primary_btn mt-4">
                立即提领
              </button>
            </form>
            <div className="right-group">
              <label className="form-label2">近期提领记录</label>
              <div className="list-container">
                {withdraws.map((t, i) => (
                  <div key={i} className="list-item">
                    <div className="list-title">
                      交易单号{' '}
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
                      交易时间 <span>{toDateTime(t.created_at)}</span>
                    </div>
                    <div className="list-title">
                      交易金額 <span className="text-red">{t.amount}</span>
                    </div>
                    <div className="list-title">
                      交易状态{' '}
                      <span>{toOptionName(processStatusOpts, t.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="pointer mt-3 more-btn"
                onClick={() => router.push('/my/trade/withdraw-record')}
              >
                查询更多
                <i className="iconfont allow-right" />
              </div>
            </div>
          </div>
        </Box>
      </MemberMenu>
      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default WithdrawPage
