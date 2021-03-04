import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box } from '@chakra-ui/layout'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function HeaderUserInfo() {
  const { user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { doLogout } = useService()
  return (
    <>
      <Box className="name">欢迎您，{user?.name}</Box>
      <Box w="2px" h="14px" bg="rgba(255, 255, 255, .3)"></Box>
      <Box className="account">总资产：{toCurrency(user?.balance, 3)}</Box>
      <Box w="2px" h="14px" bg="rgba(255, 255, 255, .3)"></Box>
      <Box
        className="iconfont mail"
        fontSize="20px"
        ml="10px"
        color="rgba(255, 255, 255, 1)"
        cursor="pointer"
        _hover={{ color: 'rgba(255, 255, 255, .75)' }}
        onClick={() => router.push('/my/message')}
      ></Box>
      <Box
        className="iconfont exit"
        fontSize="20px"
        ml="10px"
        color="rgba(255, 255, 255, 1)"
        cursor="pointer"
        _hover={{ color: 'rgba(255, 255, 255,.75)' }}
        onClick={() => doLogout()}
      ></Box>
    </>
  )
}

export default HeaderUserInfo
