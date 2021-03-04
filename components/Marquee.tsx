import { Box, Text, Flex } from '@chakra-ui/layout'
import { Marquee as MarqueeType } from '@/lib/types'
import React, { useEffect } from 'react'

type NoticeBarProps = {
  msgs: MarqueeType[]
}
const Marquee: React.FC<NoticeBarProps> = ({ msgs }) => {
  return (
    <Flex
      className="marquee-box"
      h="40px"
      w="full"
      alignItems="center"
      ml="10px"
    >
      {msgs.map((t, i) => (
        <Text key={i} color="#fff" fontSize="14px">
          {t.content}
        </Text>
      ))}
    </Flex>
  )
}

export default Marquee
