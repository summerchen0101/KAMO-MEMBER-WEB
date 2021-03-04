import Dashboard from '@/components/Dashboard'
import FloatNav from '@/components/FloatNav'
import Footer from '@/components/Footer'
import useRequest from '@/utils/useRequest'
import { Box, HStack } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const AboutPage: React.FC = () => {
  const [content, setContent] = useState('')
  const API = useRequest()
  const fetchContent = async () => {
    try {
      const res = await API.getAboutContent()
      setContent(res.data.content_mobile)
    } catch (err) {}
  }
  useEffect(() => {
    fetchContent()
  }, [])
  return (
    <Dashboard>
      <main className="main">
        <section className="detail">
          <Box className="detail-box laout">
            <HStack
              shadow="sm"
              bg="white"
              borderRadius="md"
              p="50px"
              alignItems="start"
            >
              <Box mb="30px">
                <Box className="title-col" mb="4">
                  关于AG
                </Box>
                {content}
              </Box>
              <Image src="/img/about-bg.jpg" maxW="600px" />
            </HStack>
          </Box>
        </section>
      </main>

      <Footer />
      <FloatNav />
    </Dashboard>
  )
}

export default AboutPage
