import Paginator from '@/components/Paginator'
import React, { createContext, useContext, useState } from 'react'

type ContextState = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
  totalCount: number
  setTotalCount: React.Dispatch<React.SetStateAction<number>>
}

const PaginationContext = createContext<ContextState>(null)

const PaginationProvider: React.FC = ({ children }) => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  return (
    <PaginationContext.Provider
      value={{
        page,
        setPage,
        totalPages,
        setTotalPages,
        totalCount,
        setTotalCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

export const usePaginationContext = () => useContext(PaginationContext)

export default PaginationProvider
