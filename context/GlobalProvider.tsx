import React, { createContext, useContext, useMemo, useState } from 'react'
import {
  Handicap,
  MemberBank,
  MemberBankOption,
  Odds,
  UserContact,
  UserInfo,
} from '@/lib/types'
import useStorage from '@/utils/useStorage'
import useTransfer from '@/utils/useTransfer'

type ContextState = {
  user: UserInfo
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>
  userContact: UserContact
  setUserContact: React.Dispatch<React.SetStateAction<UserContact>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  bettingInfo: Odds
  setBettingInfo: React.Dispatch<React.SetStateAction<Odds>>
  eventInfo: Handicap
  setEventInfo: React.Dispatch<React.SetStateAction<Handicap>>
  bankcardOpts: MemberBankOption[]
  setBankcardOpts: React.Dispatch<React.SetStateAction<MemberBankOption[]>>
  bankcards: MemberBank[]
  setBankcards: React.Dispatch<React.SetStateAction<MemberBank[]>>
}

const GlobalContext = createContext<ContextState>(null)

const GlobalProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null)
  const [bankcardOpts, setBankcardOpts] = useState<MemberBankOption[]>([])
  const [bankcards, setBankcards] = useState<MemberBank[]>([])
  const [userContact, setUserContact] = useState<UserContact>(null)
  const [token, setToken] = useStorage<string>('token', '')
  const [bettingInfo, setBettingInfo] = useState<Odds>(null)
  const [eventInfo, setEventInfo] = useStorage<Handicap>('event', null)
  const { toCurrency } = useTransfer()
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        userContact,
        setUserContact,
        token,
        setToken,
        bettingInfo,
        setBettingInfo,
        eventInfo,
        setEventInfo,
        bankcardOpts,
        setBankcardOpts,
        bankcards,
        setBankcards,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalProvider = () => useContext(GlobalContext)

export default GlobalProvider
