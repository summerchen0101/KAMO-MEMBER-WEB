import React from 'react'
import AlertProvider from '@/context/AlertProvider'
import GlobalProvider from '@/context/GlobalProvider'
import LoaderProvider from '@/context/LoaderProvider'
import DateProvider from '@/context/DateProvider'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/theme'
import PopupProvider from '@/context/PopupContext'
import PaginationProvider from '@/context/PaginationProvider'
import MetaHead from '@/components/MetaHead'
import 'swiper/swiper-bundle.css'
import '@/style/global.scss'

const MyApp = ({ Component, props }) => {
  return (
    <GlobalProvider>
      <DateProvider>
        <ChakraProvider theme={theme}>
          <LoaderProvider>
            <PopupProvider>
              <AlertProvider>
                <PaginationProvider>
                  <MetaHead />
                  <Component {...props} />
                </PaginationProvider>
              </AlertProvider>
            </PopupProvider>
          </LoaderProvider>
        </ChakraProvider>
      </DateProvider>
    </GlobalProvider>
  )
}

export default MyApp
