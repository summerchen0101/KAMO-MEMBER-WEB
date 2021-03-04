import { FormHelperText } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Text } from '@chakra-ui/layout'
import React from 'react'
import { FieldError } from 'react-hook-form/dist/types'
import { HiInformationCircle, HiOutlineInformationCircle } from 'react-icons/hi'

const FieldValidateMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) return <></>
  return (
    <FormHelperText color="red" fontSize="14px">
      <Icon as={HiInformationCircle} mr="5px" />
      {error.message}
    </FormHelperText>
  )
}

export default FieldValidateMessage
