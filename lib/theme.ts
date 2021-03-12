import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    100: '#FCF7EC',
    200: '#F9EEDA',
    300: '#EFDDC2',
    400: '#DFC7AA',
    500: '#cbab8b',
    600: '#AE8665',
    700: '#926446',
    800: '#75462C',
    900: '#612F1A',
  },
  divider: { 500: '#F0F0F0' },
  border: { 500: '#D8DCE7' },
  table: {
    400: '#FBFCFF',
    500: '#fbfcff',
    600: '#B7BFDB',
  },
  gray: {
    500: '#9da5bb',
    600: '#858ca3',
    700: '#515b7c',
  },
  red: {
    500: '#e4b2b3',
  },
  blue: {
    400: '#EAF4FD',
    500: '#32c5ff',
  },
  green: {
    500: '#52C94B',
  },
}
const theme = extendTheme({ colors })

export default theme
