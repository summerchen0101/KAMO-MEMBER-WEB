import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { Box, Link, Center, Stack, HStack } from '@chakra-ui/layout'
import { Input, outline, Button } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
// import { Button } from 'react-bootstrap'

function HeaderUserInfo() {
  const { user } = useGlobalProvider()
  const { toCurrency } = useTransfer()
  const router = useRouter()
  const { doLogout } = useService()
  return (
    <>
      {/* 未登入前 */}
      {/* <HStack spacing="10px" as="form">
        <Box
          w="140px"
          bgColor="#fff"
          borderRadius="13px"
          pr="13px"
          display="flex"
        >
          <Box
            w="26px"
            h="26px"
            m="0 5px 0 8px"
            color="brand.500"
            bgColor="transparent"
            className="iconfont ic-userid"
          ></Box>
          <Input
            type="text"
            p="0"
            fontSize="14px"
            color="#CBAB8B"
            _placeholder={{ color: 'brand.500' }}
            lineHeight="26px"
            h="26px"
            border="transparent"
            focusBorderColor="transparent"
            name="acc"
            placeholder="账号"
          />
        </Box>
        <Box w="140px" bgColor="#fff" borderRadius="13px" display="flex">
          <Box
            w="26px"
            h="26px"
            m="0 5px 0 8px"
            color="brand.500"
            bgColor="transparent"
            className="iconfont ic-password"
          ></Box>
          <Input
            type="text"
            p="0"
            fontSize="14px"
            color="#CBAB8B"
            _placeholder={{ color: 'brand.500' }}
            lineHeight="26px"
            h="26px"
            border="transparent"
            focusBorderColor="transparent"
            name="acc"
            placeholder="密码"
          />
          <Box
            w="26px"
            h="26px"
            fontSize="18px"
            m="0 8px 0 5px"
            color="#E8E3D9"
            _hover={{ color: 'brand.500' }}
            bgColor="transparent"
            transition="color .15s ease-in-out"
            className="iconfont ic-problem"
          ></Box>
        </Box>

        <button className="sec_btn color-primary" style={{ width: '70px' }}>
          登录
        </button>
        <button className="sec_btn color-blue" style={{ width: '70px' }}>
          注册
        </button>
      </HStack> */}

      {/* 登入後 */}
      <Box className="name" onClick={() => router.push('/my/profile')}>
        {user?.name}
      </Box>
      <Box className="vip-level">VIP 0</Box>
      <Box className="balance">¥ {toCurrency(user?.balance, 3)}</Box>

      <Link mx="5px" className="link" href="/my/deposit">
        存款
      </Link>

      <Link mx="5px" className="link" href="/my/transfer">
        转账
      </Link>
      <Link mx="5px" className="link" href="/my/withdrawal">
        取款
      </Link>
      <Box w="2px" h="14px" bg="rgba(255, 255, 255, .3)" mx="5px"></Box>
      <Box
        className="iconfont ic-message link"
        fontSize="20px"
        cursor="pointer"
        ml="10px"
        onClick={() => router.push('/my/message')}
      ></Box>
      <Box
        className="iconfont ic-exit link"
        fontSize="20px"
        cursor="pointer"
        ml="10px"
        onClick={() => doLogout()}
      ></Box>
    </>
  )
}

export default HeaderUserInfo
