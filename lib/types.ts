import { NewsType } from './enums'

export class ResponseBase<T> {
  code: number
  data: T
}

export class BaseListResponse<T> {
  list: T[]
  total_count: number
  total_page: number
}

export interface BaseListRequest {
  page?: number
  perpage?: number
}

export interface DateRangeRequest {
  start_at?: number
  end_at?: number
}

export type DateRangeListRequest = BaseListRequest & DateRangeRequest

export interface WithdrawListRequest extends DateRangeListRequest {
  usdt_type?: number
  status?: number
}

export interface Member {
  acc: string
  id: number
  name: string
}

export interface CheckLoginResponseData {
  member: Member
}

export type OptionType<T> = {
  label: string
  value: T
}
export type OptionBasic = {
  id: number
  name: string
}

export interface News {
  content: string
  created_at: number
  end_at: number
  id: number
  is_active: boolean
  news_type: NewsType
  start_at: number
  title: string
  updated_at: number
}

export interface NewsDetail {
  id: number
  news_type: NewsType
  title: string
  content: string
  updated_at: number
  created_at: number
}

export interface Activity {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  bonus: number
}

export interface ActivityDetail {
  id: number
  title: string
  content: string
  content_mobile: string
  img: string
  img_mobile: string
  start_at: number
  end_at: number
  bonus: number
}

export interface Faq {
  id: number
  catalogue: {
    id: number
    name: string
  }
  title: string
  content: string
  content_mobile: string
  created_at: number
  updated_at: number
}

export interface Marquee {
  id: number
  content: string
  url: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}
export interface Banner {
  id: number
  title: string
  url: string
  img: string
  img_mobile: string
  is_blank: boolean
  is_active: boolean
  start_at: number
  end_at: number
}

export interface Withdraw {
  id: number
  amount: number
  balance: number
  bank_acc: string
  bank_branch: string
  bank_name: string
  bank_person: string
  created_at: number
  sn: string
  status: number
  updated_at: number
}
export interface WithdrawCreateRequest {
  bank_id: number
  amount: number
  sec_pass: string
}

export interface TeamInfo {
  id: number
  league_id: number
  league_name: string
  name: string
  name_en: string
}

export interface Handicap {
  single_game_limit: number
  bet_sum: number
  game_code: string
  id: number
  play_at: number
  team_away: TeamInfo
  team_home: TeamInfo
}

export interface BetRecordSummary {
  date: string
  count: number
  amount: string
  result: string
}

export interface BetRecord {
  accounting_status: number
  amount: number
  away_percent: number
  away_point: number
  bet_item: string
  created_at: number
  fee: number
  game_code: string
  handicap: {
    id: number
    play_at: number
    team_away: TeamInfo
    team_home: TeamInfo
  }
  home_percent: number
  home_point: number
  id: number
  odds: number
  rebate: number
  result: number
  section_code: string
  bet_type: string
  sn: string
  valid_amount: number
}

export interface BetCreateRequest {
  odds_id: number
  odds: number
  amount: number
}

export interface Odds {
  id: number
  away_percent: number
  away_point: number
  single_game_limit: number
  bet_sum: number
  game_code: string
  home_percent: number
  home_point: number
  odds: number
  play_code: string
  section_code: string
}

export interface OddsListRequest extends BaseListRequest {
  handicap_id?: number
  section_code?: string
}

export interface Score {
  away_half_score: number
  away_score: number
  away_team: string
  game_code: string
  game_status: number
  home_half_score: number
  home_score: number
  home_team: string
  id: number
  play_time: string
  league: string
}

export interface Message {
  id: number
  title: string
  content: string
  created_at: number
  is_read: boolean
}
export interface MemberBank {
  id: number
  acc: string
  branch: string
  confirmed_at: number
  created_at: number
  img: string
  is_confirm: boolean
  is_default: boolean
  name: string
  person: string
  updated_at: number
}

export interface MemberBankOption {
  acc: string
  branch: string
  id: number
  name: string
  person: string
}

export interface MemberBankCreateRequest {
  name: string
  branch: string
  acc: string
  person: string
  img: string
  is_default: boolean
}

export interface PwUpdateRequest {
  old_pass: string
  pass: string
}

export interface RegisterRequest {
  promo_code: string
  acc: string
  name: string
  pass: string
  mobile: string
  email: string
}

export interface LoginRequest {
  acc: string
  pass: string
  code: string
  token: string
}

export interface LoginResponse {
  acc: string
  id: number
  name: string
  token: string
}

export interface UserInfo {
  acc: string
  balance: number
  bet_sum: number
  id: number
  name: string
  promo_code: string
  email: string
  mobile: string
}
export interface EditUserInfoRequest {
  name: string
}

export interface CaptchaResponse {
  img: string
  token: string
}

export interface PageContent {
  id: number
  title: string
  code: string
  content: string
  content_mobile: string
  is_active: boolean

  editor: string
  created_at: number
  updated_at: number
}

export interface UserContact {
  name?: string
  mobile?: string
  email?: string
  line_id?: string
  wechat_id?: string
  qq_id?: string
  telegram_id?: string
}
