import LoginPopup from '@/components/popups/NicknamePopup'
import ForgetPopup from '@/components/popups/ForgetPopup'
import React, { createContext, useContext, useState } from 'react'

type PopupProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface IState {
  login: PopupProps<boolean>
  betting: PopupProps<boolean>
  forgetPw: PopupProps<boolean>
  floatNav: PopupProps<boolean>
  nickname: PopupProps<boolean>
  wechat: PopupProps<boolean>
  qq: PopupProps<boolean>
  line: PopupProps<boolean>
  telegram: PopupProps<boolean>
  email: PopupProps<boolean>
  phone: PopupProps<boolean>
  pass: PopupProps<boolean>
  tradePass: PopupProps<boolean>
  bankcardList: PopupProps<boolean>
  bankcardAdd: PopupProps<boolean>
}

const PopupContext = createContext<IState | null>(null)

const PopupProvider: React.FC = ({ children }) => {
  const initialState: IState = {
    login: useState(false),
    betting: useState(false),
    forgetPw: useState(false),
    floatNav: useState(true),
    nickname: useState(false),
    wechat: useState(false),
    qq: useState(false),
    line: useState(false),
    telegram: useState(false),
    email: useState(false),
    phone: useState(false),
    pass: useState(false),
    tradePass: useState(false),
    bankcardList: useState(false),
    bankcardAdd: useState(false),
  }
  return (
    <PopupContext.Provider value={initialState}>
      {children}
      <ForgetPopup />
    </PopupContext.Provider>
  )
}

export default PopupProvider

export const usePopupContext = (popupName: keyof IState) => {
  const state = useContext(PopupContext)
  return state[popupName]
}
