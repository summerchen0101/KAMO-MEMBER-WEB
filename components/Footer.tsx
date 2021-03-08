import { Box, Text } from '@chakra-ui/layout'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <Text pb="25px">KAMO提醒您，进行注册并娱乐前，请确保您年满18周岁！</Text>
      <Box className="laout" w="100%" h="1px" bgColor="#515B7C"></Box>
      <ul className="article-menu laout">
        <li>
          <Link href="/about">新手帮助</Link>
        </li>
        <li>
          <Link href="/policy">竞猜责任</Link>
        </li>
        <li>
          <a href="./hp-main.html">隐私保护</a>
        </li>
        <li>
          <a href="./hp-main.html">规则条款</a>
        </li>
        <li>
          <a href="./hp-main.html">联系我们</a>
        </li>
        <li>
          <a href="./hp-main.html">代理加盟</a>
        </li>
        <li>
          <a href="./hp-main.html">APP下载</a>
        </li>
      </ul>
      <div className="copyright">
        Copyright © 2021 KAMO. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
