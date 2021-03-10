import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import classNames from 'classnames'
import { useRouter } from 'next/dist/client/router'
import React, { ReactNode } from 'react'
import { Box, Center, Image, Flex, Text } from '@chakra-ui/react'

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
        <li className="active">
          <i className="ic-deposit iconfont"></i>存款
        </li>
        <li>
          <i className="ic-transfer iconfont"></i>转账
        </li>
        <li>
          <i className="ic-withdrawal iconfont"></i>取款
        </li>
      </ul>
      <ul className="menu-inner ">
        <li className="active">
          <i className="iconfont ic-profile"></i>个人资料
        </li>
        <li>
          <i className="iconfont ic-vip"></i>VIP特权
        </li>
      </ul>
      <Box w="full" height="1px" bgColor="#F0F0F0" m="8px 0"></Box>
      <ul className="menu-inner">
        <li>
          <i className="iconfont ic-wallet"></i>我的钱包
        </li>
        <li>
          <i className="iconfont ic-trans-record"></i>交易记录
        </li>
        <li>
          <i className="iconfont ic-bet-record"></i>投注记录
        </li>
      </ul>
      <Box w="full" height="1px" bgColor="#F0F0F0" m="8px 0"></Box>
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

    // <main className="main">
    //   <section className="my">
    //     <div className="my-box laout ">
    //       <div className="contents">
    //         <div className="menu-section">
    //           <ul className="menu-inner list-group">
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/profile'),
    //               })}
    //               onClick={() => router.push('/my/profile')}
    //             >
    //               <i className="iconfont person" />
    //               个人资料
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/deposit'),
    //               })}
    //               onClick={() => router.push('/my/deposit')}
    //             >
    //               <i className="iconfont recharge" />
    //               立即充值
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/withdraw'),
    //               })}
    //               onClick={() => router.push('/my/withdraw')}
    //             >
    //               <i className="iconfont withdrawal" />
    //               立即提领
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/trade'),
    //               })}
    //               onClick={() => router.push('/my/trade/withdraw-record')}
    //             >
    //               <i className="iconfont icon-detail" />
    //               充提纪录
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/news'),
    //               })}
    //               onClick={() => router.push('/my/news')}
    //             >
    //               <i className="iconfont notice" />
    //               公告
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/message'),
    //               })}
    //               onClick={() => router.push('/my/message')}
    //             >
    //               <i className="iconfont mail" />
    //               站内信
    //             </li>
    //             <li
    //               className={classNames('menu-list-item', {
    //                 active: router.pathname.includes('/my/invite'),
    //               })}
    //               onClick={() => router.push('/my/invite')}
    //             >
    //               <i className="iconfont friend" />
    //               会员推广
    //             </li>
    //           </ul>
    //         </div>
    //         {children}
    //       </div>
    //     </div>
    //   </section>
    // </main>
  )
}

export default MemberMenu
