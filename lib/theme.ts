import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    400: '#F1D3B6',
    500: '#cbab8b',
    600: '#B78255',
  },
  gray: {
    500: '#9da5bb',
    600: '#858ca3',
    700: '#515b7c',
  },
  red: {
    500: '#F54C40',
  },
  green: {
    500: '#52C94B',
  },
}
const theme = extendTheme({ colors })

export default theme
