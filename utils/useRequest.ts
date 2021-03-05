import Axios, { AxiosRequestConfig } from 'axios'
import httpStatus from 'http-status'
import { useRouter } from 'next/dist/client/router'
import { useAlertProvider } from '@/context/AlertProvider'
import errCodes from '@/lib/errCodes'
import {
  BaseListRequest,
  BaseListResponse,
  CheckLoginResponseData,
  LoginRequest,
  LoginResponse,
  Marquee,
  News,
  NewsDetail,
  PwUpdateRequest,
  RegisterRequest,
  ResponseBase,
  UserInfo,
  CaptchaResponse,
  Banner,
  Activity,
  ActivityDetail,
  Faq,
  MemberBank,
  OptionBasic,
  MemberBankCreateRequest,
  Message,
  Withdraw,
  WithdrawCreateRequest,
  Handicap,
  Score,
  DateRangeListRequest,
  OddsListRequest,
  Odds,
  BetRecord,
  DateRangeRequest,
  BetCreateRequest,
  PageContent,
  BetRecordSummary,
  UserContact,
  EditUserInfoRequest,
  MemberBankOption,
} from '@/lib/types'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { useToast } from '@chakra-ui/toast'
import { useLoaderProvider } from '@/context/LoaderProvider'

const useRequest = () => {
  const router = useRouter()
  const { token } = useGlobalProvider()
  const { loadingStart, loadingEnd } = useLoaderProvider()
  const config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: process.env.apiBaseUrl,
    validateStatus: function (status) {
      return true
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const AxiosInstance = Axios.create(config)
  const toast = useToast()
  AxiosInstance.interceptors.request.use((req) => {
    loadingStart()
    return req
  })
  AxiosInstance.interceptors.response.use((res) => {
    loadingEnd()
    let errorMsg = ''
    if (res.data.code) {
      errorMsg = errCodes[res.data.code] || `錯誤代碼 ${res.data.code}`
    } else if (res.status === 401) {
      // router.push('/login')
      // errorMsg = httpStatus[401]
    } else if (res.status === 500) {
      errorMsg = '系統錯誤'
    } else if (res.data.error) {
      errorMsg = '操作錯誤'
    }
    if (errorMsg) {
      // toast({ status: 'error', title: errorMsg })
      throw new Error(errorMsg)
    }
    return res.data
  })
  const get = function <T>(
    url: string,
    params = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.get(url, { params })
  }
  const post = async function <T>(
    url: string,
    data = null,
  ): Promise<ResponseBase<T>> {
    return AxiosInstance.post(url, data)
  }

  /**
   * 最新公告
   */
  const getNewsList = (req?: BaseListRequest) =>
    post<BaseListResponse<News>>('news/list', { page: 1, perpage: 100, ...req })

  const getNewsDetail = (id: number) => get<NewsDetail>(`news/view/${id}`)

  /**
   * 優惠活動
   */
  const getActivityList = (req?: BaseListRequest) =>
    post<BaseListResponse<Activity>>('activity/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const applyActivity = (activity_id: number) =>
    post<null>('activity_rec/add', { activity_id })

  const getActivityDetail = (id: number) =>
    get<ActivityDetail>(`activity/view/${id}`)

  /**
   * 常見問題
   */
  const getFaqList = (req?: BaseListRequest) =>
    post<BaseListResponse<Faq>>('qa/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const getFaqDetail = (id: number) => get<Faq>(`qa/view/${id}`)

  /**
   * 跑馬燈
   */
  const getMarqueeList = () =>
    post<BaseListResponse<Marquee>>('marquee/list', { page: 1, perpage: 100 })

  /**
   * 輪播圖
   */
  const getBannerList = () =>
    post<BaseListResponse<Banner>>('banner/list', { page: 1, perpage: 100 })

  /**
   * 站內信
   */
  const getMessageList = () =>
    post<BaseListResponse<Message>>('inbox_message/list', {
      page: 1,
      perpage: 100,
    })

  const getMessageDetail = (id: number) =>
    get<Message>(`inbox_message/view/${id}`)

  /**
   * 銀行卡
   */
  const getMemberBankList = (req?: BaseListRequest) =>
    post<BaseListResponse<MemberBank>>('member_bank/list', {
      page: 1,
      perpage: 100,
      ...req,
    })

  const getMemberBankOptions = () =>
    post<BaseListResponse<MemberBankOption>>('member_bank/options', {
      page: 1,
      perpage: 100,
    })

  const setDefaultMemberBank = (id: number) =>
    post<null>('member_bank/default', {
      id,
      is_active: true,
    })

  const removeMemberBank = (id: number) =>
    post<null>('member_bank/remove', { id })

  const createMemberBank = (req: MemberBankCreateRequest) =>
    post<null>('member_bank/add', req)

  /**
   * 提領
   */
  const getWithdrawList = (req?: DateRangeListRequest) =>
    post<BaseListResponse<Withdraw>>('withdraw_rec/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const createWithdraw = (req: WithdrawCreateRequest) =>
    post<null>('withdraw_rec/add', req)

  /**
   * 賽事盤口
   */
  const getHandicapList = (req?: DateRangeListRequest) =>
    post<BaseListResponse<Handicap>>('handicap/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const getHotHandicaps = () => post<BaseListResponse<Handicap>>('handicap/hot')

  const getHandicapDetail = (id: number) => get<Handicap>(`handicap/view/${id}`)

  /**
   * 賠率
   */
  const getOddsList = (req?: OddsListRequest) =>
    post<BaseListResponse<Odds>>('odds/list', {
      page: 1,
      perpage: 100,
      section_code: 'F',
      ...req,
    })

  /**
   * 比分
   */
  const getScoreList = () =>
    post<BaseListResponse<Score>>('score/list', { game_code: 'SC' })

  /**
   * 注單
   */
  const getBetRecordList = (req?: DateRangeRequest) =>
    post<BaseListResponse<BetRecord>>('bet_rec/list', {
      page: 1,
      perpage: 100,
      ...req,
    })
  const createBet = (req: BetCreateRequest) => post<null>('bet_rec/add', req)

  /**
   * 單日注單資訊
   */
  const getBetRecordSummary = (req?: DateRangeRequest) =>
    post<BaseListResponse<BetRecordSummary>>('bet_rec/summary', {
      page: 1,
      perpage: 100,
      ...req,
    })

  /**
   * 頁面內容
   */

  const getAboutContent = () => get<PageContent>('page/view/ABOUT')

  /**
   * 個人聯絡資料
   */
  const getUserContact = () => get<UserContact>('member_contact/view')
  const editUserContact = (req: UserContact) =>
    post<null>('member_contact/edit', req)

  const checkLogin = () => get<CheckLoginResponseData>('check_login')
  const getCaptcha = () => get<CaptchaResponse>('captcha')

  const updatePw = (req: PwUpdateRequest) => post<null>('member/pass', req)
  const updateTradePw = (req: PwUpdateRequest) =>
    post<null>('member/sec_pass', req)
  const checkAcc = (acc: string) => post<null>('check_acc', { acc })
  const checkName = (name: string) => post<null>('check_name', { name })
  const sendSmsCode = (mobile: string) => post<null>('sms_code', { mobile })
  const register = (req: RegisterRequest) =>
    post<{ token: string }>('register', req)
  const login = (req: LoginRequest) => post<LoginResponse>('login', req)
  const logout = () => get<null>('logout')

  const getUserInfo = () => get<UserInfo>('member/view')
  const editUserInfo = (req: EditUserInfoRequest) =>
    post<null>('member/edit', req)

  return {
    getUserContact,
    editUserContact,
    getAboutContent,
    getUserInfo,
    editUserInfo,
    getMemberBankList,
    getMemberBankOptions,
    createMemberBank,
    setDefaultMemberBank,
    removeMemberBank,
    getMessageList,
    getMessageDetail,
    getWithdrawList,
    createWithdraw,
    getNewsList,
    getNewsDetail,
    applyActivity,
    getActivityList,
    getActivityDetail,
    getMarqueeList,
    getBannerList,
    getHandicapDetail,
    getHandicapList,
    getHotHandicaps,
    getScoreList,
    getOddsList,
    getFaqList,
    getFaqDetail,
    getBetRecordList,
    getBetRecordSummary,
    createBet,
    checkLogin,
    getCaptcha,
    updatePw,
    updateTradePw,
    checkAcc,
    checkName,
    sendSmsCode,
    register,
    login,
    logout,
  }
}

export default useRequest
