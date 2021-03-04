import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { usePopupContext } from '@/context/PopupContext'
import { Handicap, Odds, OptionType } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useMemo, useState } from 'react'
import BettingPopup from './popups/BettingPopup'

interface SectionOddsProps {
  section: OptionType<string>
  handicap: Handicap
}
function SectionOdds({ section, handicap }: SectionOddsProps) {
  const [isEmpty, setIsEmpty] = useState(false)
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const { setBettingInfo, setEventInfo, eventInfo } = useGlobalProvider()
  const [, setBettingVisible] = usePopupContext('betting')
  const { fetchUserInfo } = useService()
  const API = useRequest()
  const { toCurrency, toDateTime } = useTransfer()
  const [odds, setOdds] = useState<Odds[]>([])
  const router = useRouter()

  const fetchOdds = async () => {
    loadingStart()
    setIsEmpty(false)
    try {
      const res = await API.getOddsList({
        handicap_id: handicap.id,
        section_code: section.value,
      })
      setOdds(res.data.list)
      if (res.data.list.length === 0) {
        setIsEmpty(true)
      }
    } catch (err) {}
    loadingEnd()
  }

  const handleBetting = (odds: Odds) => {
    setBettingInfo(odds)
    setEventInfo(handicap)
    setBettingVisible(true)
  }

  useEffect(() => {
    fetchOdds()
  }, [handicap])

  useEffect(() => {
    Promise.all([fetchUserInfo()])
  }, [])
  return (
    <div className="col-odds">
      <div className="bar-style">
        <div className="top">
          <h3>{section.label}比分</h3>
          {/* <p>
            成交量 : <span>4,835,278.96</span>
          </p>
          <div
            className="icon-btn"
            // onClick="document.getElementById('chartsId').style.display='block'"
          >
            <i className="iconfont billboard" />
            成交量排行
          </div> */}
        </div>
        <div className="bar-show">
          <div className="th">
            <h3>选项</h3>
            <h3>获利</h3>
            <h3>可交易</h3>
          </div>
          {odds.map((t, i) => (
            <div key={i} className="td">
              <p>
                {t.home_point} - {t.away_point}
              </p>
              <p>{(t.odds * 100).toFixed(2)}%</p>
              <p>￥{toCurrency(t.single_game_limit)}</p>
              <div className="mini_btn" onClick={() => handleBetting(t)}>
                下单
              </div>
            </div>
          ))}
        </div>
      </div>
      <BettingPopup />
    </div>
  )
}

export default SectionOdds
