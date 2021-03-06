import FieldValidateMessage from '@/components/FieldValidateMessage'
import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import pattern from '@/lib/pattern'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  FormLabel,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  acc: string
  pass: string
  code: string
}

function login() {
  const router = useRouter()
  const { token, setToken } = useGlobalProvider()
  const [, setForgetVisible] = usePopupContext('forgetPw')
  const API = useRequest()
  const { copyToClipboard } = useHelper()
  const [captchaImg, setCaptchaImg] = useState('')
  const { register, handleSubmit, errors, getValues } = useForm<FormData>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.login({
        acc: d.acc,
        pass: d.pass,
        code: d.code,
        token,
      })
      setToken(res.data.token)
      router.push('/home')
    } catch (err) {}
  })
  const fetchCaptcha = async () => {
    try {
      const res = await API.getCaptcha()
      setCaptchaImg(res.data.img)
      setToken(res.data.token)
    } catch (err) {}
  }
  useEffect(() => {
    fetchCaptcha()
  }, [])
  return (
    <Center
      w="100vw"
      h="100vh"
      bgImage="url('/img/bg-login.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Box>
        <Box mb="30px">
          <Image src="/img/logo.svg" m="auto" w="150px" />
        </Box>
        <Box w="298px" as="form" onSubmit={onSubmit}>
          <Box className="formGroup" mb="20px">
            <Box className="formInputGroup">
              <i className="iconfont ic-userid"></i>
              <input
                type="text"
                className="formInput"
                name="acc"
                placeholder="???????????????"
                ref={register({
                  required: '????????????',
                  pattern: {
                    value: pattern.acc,
                    message: '????????????',
                  },
                })}
              />
              <FieldValidateMessage error={errors.acc} />
            </Box>
          </Box>

          <Box className="formGroup" mb="20px">
            <Box className="formInputGroup">
              <i className="iconfont ic-password"></i>
              <input
                type="password"
                className="formInput"
                name="pass"
                ref={register({ required: '????????????' })}
                placeholder="???????????????"
              />
            </Box>
            {/* <i className="iconfont iconeye-close btn_eye" /> */}
          </Box>
          <HStack mb="20px">
            <Box className="formGroup">
              <Box className="formInputGroup">
                <i className="iconfont ic-verify"></i>
                <input
                  type="text"
                  className="formInput"
                  name="code"
                  placeholder="??????????????????"
                  ref={register({ required: '????????????' })}
                />

                <FieldValidateMessage error={errors.code} />
              </Box>
            </Box>
            <Image src={captchaImg} onClick={() => fetchCaptcha()} />
          </HStack>
          <Flex mb="10px">
            <FormLabel className="formCheckbox" display="flex" w="">
              <input className="input-check" name="sort" type="checkbox" />
              <span className="checkmark" />
              <Text fontSize="14px">????????????</Text>
            </FormLabel>
            <Spacer />
            <Box fontSize="14px" color="#fff" cursor="pointer">
              <Link href="/home"> ?????????????</Link>
              {/* <Link href="/home">?</Link> */}
            </Box>
          </Flex>

          <button type="submit" className="btnbase primary_btn">
            ??????
          </button>
          <Center mt="15px">
            <Box fontSize="14px" color="brand.500" cursor="pointer">
              <Link href="/register"> ???????????????</Link>
              {/* <Link href="/home">?</Link> */}
            </Box>
            <Box w="2px" h="14px" bg="rgba(255, 255, 255, .3)" mx="10px"></Box>
            <Box fontSize="14px" color="#fff" cursor="pointer">
              <Link href="/home"> ????????????</Link>
              {/* <Link href="/home">?</Link> */}
            </Box>
          </Center>
          {/* <button
            type="button"
            className="btnbase forget_pwd"
            onClick={() => setForgetVisible(true)}
          >
            ????????????
          </button> */}
        </Box>
      </Box>
    </Center>
  )
}

export default login
