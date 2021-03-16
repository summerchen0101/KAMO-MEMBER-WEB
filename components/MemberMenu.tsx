import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import React, { ReactNode } from 'react'
import { Box, Center, Image, Flex, Text, Divider } from '@chakra-ui/react'

function MemberMenu() {
  const router = useRouter()
  return (
    <Box className="user-menu ">
      <Box pt="24px">
        <Center mb="8px">
          <Image
            borderRadius="50%"
            src="/img/user-private.png"
            w="80px"
            h="80px"
          ></Image>
        </Center>
        <Flex w="full" justifyContent="center" alignItems="center">
          <Text className="user-name">aiden888</Text>
          <Box className="user-vip">VIP 0</Box>
        </Flex>
        <Center className="safe-level">安全等级：低</Center>
      </Box>
      <ul className="wall-menu">
        <li
          className={classNames({
            active: router.pathname.includes('/my/deposit'),
          })}
          onClick={() => router.push('/my/deposit')}
        >
          <i className="ic-deposit iconfont"></i>存款
        </li>
        <li
          className={classNames({
            active: router.pathname.includes('/my/transfer'),
          })}
          onClick={() => router.push('/my/transfer')}
        >
          <i className="ic-transfer iconfont"></i>转账
        </li>
        <li
          className={classNames({
            active: router.pathname.includes('/my/withdrawal'),
          })}
          onClick={() => router.push('/my/withdrawal')}
        >
          <i className="ic-withdrawal iconfont"></i>取款
        </li>
      </ul>
      <ul className="menu-inner ">
        <li
          className={classNames({
            active: router.pathname.includes('/my/profile'),
          })}
          onClick={() => router.push('/my/profile')}
        >
          <i className="iconfont ic-profile"></i>个人资料
        </li>
        <li
          className={classNames({
            active: router.pathname.includes('/my/vip'),
          })}
          onClick={() => router.push('/my/vip')}
        >
          <i className="iconfont ic-vip"></i>VIP特权
        </li>
      </ul>
      <Divider
        orientation="horizontal"
        borderColor="divider.500"
        m="8px 0"
      ></Divider>
      <ul className="menu-inner">
        <li
          className={classNames({
            active: router.pathname.includes('/my/bankcard'),
          })}
          onClick={() => router.push('/my/bankcard')}
        >
          <i className="iconfont ic-bankcard"></i>银行卡
        </li>
        <li>
          <i className="iconfont ic-trans-record"></i>交易记录
        </li>
        <li>
          <i className="iconfont ic-bet-record"></i>投注记录
        </li>
      </ul>
      <Divider
        orientation="horizontal"
        borderColor="divider.500"
        m="8px 0"
      ></Divider>
      <ul className="menu-inner ">
        <li>
          <i className="iconfont ic-news"></i>公告中心
        </li>
        <li>
          <i className="iconfont ic-mail"></i>会员訊息
        </li>
        <li>
          <i className="iconfont ic-friends"></i>好友推荐
        </li>
        <li>
          <i className="iconfont ic-feedback"></i>意见反馈
        </li>
      </ul>
    </Box>
  )
}

export default MemberMenu
