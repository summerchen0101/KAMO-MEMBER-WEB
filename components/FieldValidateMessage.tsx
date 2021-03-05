import Icon from '@chakra-ui/icon'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { FieldError } from 'react-hook-form/dist/types'
import { HiInformationCircle } from 'react-icons/hi'

const FieldValidateMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) return <></>
  return (
    <Box className="text-red" fontSize="14px">
      <Icon as={HiInformationCircle} mr="5px" />
      {error.message}
    </Box>
  )
}

export default FieldValidateMessage
