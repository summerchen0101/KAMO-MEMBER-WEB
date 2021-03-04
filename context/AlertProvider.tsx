import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
  id: number
}

const AlertContext = createContext<ContextState>(null)

const AlertProvider: React.FC = ({ children }) => {
  const [isOpen, setVisible] = useState(false)
  const [id, setId] = useState<number>(null)
  const onOpen = (id: number) => {
    setId(id)
    setVisible(true)
  }
  const onClose = () => {
    setId(null)
    setVisible(false)
  }
  return (
    <AlertContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
        id,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertProvider = () => useContext(AlertContext)

export default AlertProvider
