import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    400: '#00dcff',
    500: '#00CDFF',
  },
  gray: {
    500: '#4A5359',
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
