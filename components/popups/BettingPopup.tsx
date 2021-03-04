import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import { sectionOpts } from '@/lib/options'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import {
  Box,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  useToast,
} from '@chakra-ui/react'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import BasicPopup from '../BasicPopup'

function BettingPopup() {
  const { bettingInfo, eventInfo, user } = useGlobalProvider()
  const { fetchUserInfo } = useService()
  const { toDateTime, toOptionName, amountToCanWin, toCurrency } = useTransfer()
  const [amount, setAmount] = useState<number | ''>('')
  const [visible, setVisible] = usePopupContext('betting')
  const chips = [100, 500, 1000, 5000]

  const API = useRequest()
  const toast = useToast()

  const handleReset = () => {
    setAmount('')
    setVisible(false)
  }
  const onSubmit = async () => {
    const _amount = numeral(amount).value()
    if (!_amount) {
      toast({ status: 'warning', title: '本金不可為空' })
      return
    }
    try {
      await API.createBet({
        odds_id: bettingInfo.id,
        odds: bettingInfo.odds,
        amount: _amount,
      })
      fetchUserInfo()
      toast({ status: 'success', title: '下注成功' })
      handleReset()
    } catch (err) {}
  }

  const onClose = () => {
    setVisible(false)
    handleReset()
  }

  const handleAmountChange = (amount: number) => {
    let value = amount
    if (value > user?.balance) {
      value = user?.balance
    }
    return setAmount(value || '')
  }

  useEffect(() => {
    if (amount > 999999) {
      return setAmount(999999)
    }
  }, [amount])
  return (
    <BasicPopup isOpen={visible} onClose={onClose} size="lg">
      <Box as="form" className="form" onSubmit={onSubmit}>
        <ModalHeader>
          <h2 className="main-title center">下注资讯</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          {bettingInfo && (
            <>
              <div className="order-title">
                <div className="league">{eventInfo?.team_home.league_name}</div>
                <div className="d-flex">
                  <div className="team">
                    {eventInfo?.team_home?.name}(主) VS{' '}
                    {eventInfo?.team_away?.name}
                  </div>
                  <div className="time">{toDateTime(eventInfo?.play_at)}</div>
                </div>
              </div>
              <div className="order-info">
                您正在<span className="text-red">反对</span>这场赛事结果为
                {toOptionName(sectionOpts, bettingInfo.section_code)}
                波胆 {bettingInfo.home_point}-{bettingInfo.away_point}{' '}
                <span className="text-blue">
                  @{(bettingInfo.odds * 100).toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between my-4">
                <div>
                  帐户余额 :{' '}
                  <span className="text-blue">
                    ¥ {toCurrency(user?.balance, 3)}
                  </span>
                </div>
                <div>
                  手续费 : <span className="text-yellow">5%</span>
                </div>
              </div>
              <div className="method-btn-wrap">
                <input
                  className="method-input w-50"
                  placeholder="本金"
                  value={amount}
                  onChange={(e) => handleAmountChange(+e.currentTarget.value)}
                />
                <input
                  type="number"
                  disabled
                  className="method-input w-50"
                  placeholder={`可赢 ${numeral(
                    amountToCanWin(amount, bettingInfo?.odds),
                  ).format('0,0.00')}`}
                />
              </div>
              <div className="method-btn-wrap">
                {chips.map((chip) => (
                  <div
                    key={chip}
                    className="outline_btn color-gray"
                    onClick={() => handleAmountChange(+amount + chip)}
                  >
                    +{chip}
                  </div>
                ))}
              </div>
              <div className="method-btn-wrap">
                <div
                  className="outline_btn color-gray"
                  onClick={() => setAmount('')}
                >
                  清除
                </div>
                {/* <div className="outline_btn color-gray">修改</div> */}
                <div
                  className="flex2 outline_btn color-blue"
                  onClick={() => setAmount(user?.balance)}
                >
                  余额全投
                </div>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter mb="4">
          <HStack w="full">
            <div
              className="btnbase outline_btn color-blue mr-1"
              onClick={() => setVisible(false)}
            >
              关闭视窗
            </div>
            <div
              className="btnbase primary_btn ml-1"
              onClick={() => onSubmit()}
            >
              立即投注
            </div>
          </HStack>
        </ModalFooter>
      </Box>
    </BasicPopup>
  )
}

export default BettingPopup
