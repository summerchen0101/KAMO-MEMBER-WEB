import { Box } from '@chakra-ui/layout'
import React from 'react'

function EmptyHolder() {
  return (
    <Box py="64px" className="data_null">
      <img src="/img/data_null.png" />
      <p>抱歉，目前暂无数据</p>
    </Box>
  )
}

export default EmptyHolder
