import { Box, Text, Flex, HStack, Center } from '@chakra-ui/layout'
import { Button, Image } from '@chakra-ui/react'

import { Marquee as MarqueeType } from '@/lib/types'
import React, { useEffect } from 'react'

type NoticeBarProps = {
  msgs: MarqueeType[]
}
const Marquee: React.FC<NoticeBarProps> = ({ msgs }) => {
  return (
    <Flex className="marquee-box laout" h="40px" w="full" alignItems="center">
      <Image
        src="/img/ic-marquee.png"
        w="73px"
        height="69px"
        display="block"
      ></Image>
      <Center h="40px" w="full" overflow="hidden" position="relative">
        {msgs.map((t, i) => (
          <Text key={i} color="gray.500" fontSize="14px" className="laout">
            {t.content}
          </Text>
        ))}
      </Center>
      <Button
        h="30px"
        w="72px"
        borderRadius="15px"
        mr="5px"
        className="sec_btn color-primary"
      >
        更多
      </Button>
    </Flex>
  )
}

export default Marquee
