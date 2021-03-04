import { useRouter } from 'next/dist/client/router'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import useRequest from './useRequest'
import { useCallback, useState } from 'react'
import {
  Banner,
  DateRangeListRequest,
  Handicap,
  Marquee,
  MemberBank,
  MemberBankOption,
  OptionBasic,
  Score,
  UserContact,
} from '@/lib/types'
import { useToast } from '@chakra-ui/toast'
import { usePaginationContext } from '@/context/PaginationProvider'

const useService = () => {
  const [marquee, setMarquee] = useState<Marquee[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [handicaps, setHandicaps] = useState<Handicap[]>([])
  const [scores, setScores] = useState<Score[]>([])

  const toast = useToast()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const API = useRequest()
  const router = useRouter()
  const {
    setUser,
    setUserContact,
    setBankcardOpts,
    setBankcards,
  } = useGlobalProvider()
  const { setTotalCount, setTotalPages, setPage } = usePaginationContext()

  const applyActivity = async (id: number) => {
    loadingStart()
    try {
      await API.applyActivity(id)
      toast({ status: 'success', title: '申請已送出' })
    } catch (err) {}
    loadingEnd()
  }

  const fetchBankCardOpts = async () => {
    try {
      const res = await API.getMemberBankOptions()
      setBankcardOpts(res.data.list)
    } catch (err) {}
  }
  const handleSendPhoneCode = async (acc: string) => {
    if (!acc) {
      toast({ status: 'info', title: '請先填寫帳號/手機' })
      return
    }
    try {
      await API.sendSmsCode(acc)
      toast({ status: 'success', title: '已送出驗證碼' })
    } catch (err) {}
  }

  const fetchUserContact = async () => {
    try {
      const res = await API.getUserContact()
      setUserContact(res.data)
    } catch (err) {}
  }

  const fetchUserInfo = async () => {
    try {
      const res = await API.getUserInfo()
      setUser(res.data)
    } catch (err) {}
  }

  const doLogout = async () => {
    loadingStart()
    try {
      await API.logout()
      await router.push('/login')
      setUser(null)
      toast({ status: 'success', title: '登出成功！' })
    } catch (err) {}
    loadingEnd()
  }
  const fetchMarquee = useCallback(async () => {
    try {
      const { data } = await API.getMarqueeList()
      setMarquee(data.list)
    } catch (err) {}
  }, [])

  const fetchBanners = useCallback(async () => {
    try {
      const { data } = await API.getBannerList()
      setBanners(data.list)
    } catch (err) {}
  }, [])

  const fetchMemberBankList = async () => {
    loadingStart()
    try {
      const res = await API.getMemberBankList()
      setBankcards(res.data.list)
    } catch (err) {}
    loadingEnd()
  }

  const fetchHandicaps = useCallback(async (req?: DateRangeListRequest) => {
    loadingStart()
    try {
      const { data } = await API.getHandicapList(req)
      setHandicaps(data.list)
      setTotalPages(data.total_page)
      setTotalCount(data.total_count)
    } catch (err) {}
    loadingEnd()
  }, [])

  const fetchScores = useCallback(async () => {
    loadingStart()
    try {
      const { data } = await API.getScoreList()
      setScores(data.list)
    } catch (err) {}
    loadingEnd()
  }, [])

  return {
    handleSendPhoneCode,
    doLogout,
    fetchUserInfo,
    fetchMarquee,
    fetchBanners,
    fetchHandicaps,
    fetchScores,
    fetchUserContact,
    fetchBankCardOpts,
    fetchMemberBankList,
    applyActivity,
    banners,
    marquee,
    handicaps,
    scores,
  }
}

export default useService
