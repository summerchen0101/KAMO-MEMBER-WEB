import LoginPopup from '@/components/popups/LoginPopup'
import ForgetPopup from '@/components/popups/ForgetPopup'
import React, { createContext, useContext, useState } from 'react'

type PopupProps<T> = [T, React.Dispatch<React.SetStateAction<T>>]
interface IState {
  login: PopupProps<boolean>
  betting: PopupProps<boolean>
  forgetPw: PopupProps<boolean>
}

const PopupContext = createContext<IState | null>(null)

const PopupProvider: React.FC = ({ children }) => {
  const initialState: IState = {
    login: useState(false),
    betting: useState(false),
    forgetPw: useState(false),
  }
  return (
    <PopupContext.Provider value={initialState}>
      {children}
      <LoginPopup />
      <ForgetPopup />
    </PopupContext.Provider>
  )
}

export default PopupProvider

export const usePopupContext = (popupName: keyof IState) => {
  const state = useContext(PopupContext)
  return state[popupName]
}
