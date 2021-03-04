import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  rangeType: string
  setRangeType: React.Dispatch<React.SetStateAction<string>>
}

const DateContext = createContext<ContextState>(null)

const DateProvider: React.FC = ({ children }) => {
  const [rangeType, setRangeType] = useState('today')
  return (
    <DateContext.Provider value={{ rangeType, setRangeType }}>
      {children}
    </DateContext.Provider>
  )
}

export const useDateProvider = () => useContext(DateContext)

export default DateProvider
