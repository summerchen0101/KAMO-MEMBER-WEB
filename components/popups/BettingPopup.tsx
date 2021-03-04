import { useGlobalProvider } from '@/context/GlobalProvider'
import { sectionOpts } from '@/lib/options'
import useTransfer from '@/utils/useTransfer'
import React, { useMemo, useState } from 'react'
import { HStack, Text, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { Modal } from 'react-bootstrap'
import { usePopupContext } from '@/context/PopupContext'
import numeral from 'numeral'

function BettingPopup() {
  const { bettingInfo, eventInfo, userBalance } = useGlobalProvider()
  const { toDateTime, toOptionName, amountToCanWin } = useTransfer()
  const [amount, setAmount] = useState<string>('')
  const [visible, setVisible] = usePopupContext('betting')

  const API = useRequest()
  const toast = useToast()

  const handleReset = () => {
    setAmount('')
    setVisible(false)
  }
  const onSubmit = async () => {
    try {
      await API.createBet({
        odds_id: bettingInfo.id,
        odds: bettingInfo.odds,
        amount: numeral(amount).value(),
      })
      toast({ status: 'success', title: '下注成功' })
      handleReset()
    } catch (err) {}
  }
  return (
    <Modal show={visible} onHide={handleReset} centered>
      <Modal.Header closeButton>
        <h5 className="modal-titlemodal-header">下注資訊</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="league-col text-center text-lighgray">
          {eventInfo?.league?.name}
        </div>
        <div className="text-center ft-15 my-2">
          {eventInfo?.team_home?.name}(主) VS {eventInfo?.team_away?.name}
        </div>
        <div className="time-col text-center ft-13 mb-2">
          {toDateTime(eventInfo?.play_at)}
        </div>
        {bettingInfo && (
          <div className="background-gray ft15 text-center py-3">
            您正在<span className="text-red">反对</span>这场赛事结果为
            <HStack justifyContent="center">
              <Text>{toOptionName(sectionOpts, bettingInfo.section_code)}</Text>
              <Text>
                {bettingInfo.home_point}-{bettingInfo.away_point}
              </Text>
            </HStack>
            <span className="text-blue">
              @{(bettingInfo.odds * 100).toFixed(2)}
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between py-3">
          <div className="user-wallet">余额 ¥ {userBalance}</div>
          {/* <div className="handling-charge">手续费5%</div> */}
        </div>
        <div className="method-btn-wrap">
          <input
            type="number"
            className="w-50"
            placeholder="本金"
            id="capital"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="w-50 " id="profit">
            可赢 ${amountToCanWin(amount, bettingInfo?.odds)}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex flex-row justify-content-between flex-nowrap">
        <button
          type="button"
          className="btnbase outline_btn color-blue"
          onClick={() => setVisible(false)}
        >
          关闭视窗
        </button>
        <button
          type="button"
          className="btnbase primary_btn"
          onClick={() => onSubmit()}
        >
          立即投注
        </button>
        {/* <button type="button" class="btnbase primary_btn color-yellow">接受变化</button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default BettingPopup
