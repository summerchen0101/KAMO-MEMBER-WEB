import { Box } from '@chakra-ui/layout'
import React from 'react'
import { FieldError } from 'react-hook-form/dist/types'

const FieldValidateMessage: React.FC<{ error?: FieldError }> = ({ error }) => {
  if (!error) return <></>
  return (
    <Box className="text-red" fontSize="14px">
      <i className="iconfont iconerror mr-1"></i>
      {error.message}
    </Box>
  )
}

export default FieldValidateMessage
