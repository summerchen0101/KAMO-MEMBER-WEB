import { Box, Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Fade } from '@chakra-ui/transition'
import React, { createContext, useContext, useState } from 'react'
import { Modal } from 'react-bootstrap'

type ContextState = {
  isLoading: boolean
  loadingStart: () => void
  loadingEnd: () => void
}

const LoaderContext = createContext<ContextState>(null)

const LoaderProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const loadingStart = () => setLoading(true)
  const loadingEnd = () => setLoading(false)
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        loadingStart,
        loadingEnd,
      }}
    >
      {children}
      <Fade in={isLoading} unmountOnExit>
        <Center p="40px" h="full" w="full" pos="fixed" top="0" zIndex="99">
          <Spinner size="xl" color="rgba(0,0,0,0.3)" thickness="3px" />
        </Center>
      </Fade>
    </LoaderContext.Provider>
  )
}

export const useLoaderProvider = () => useContext(LoaderContext)

export default LoaderProvider
