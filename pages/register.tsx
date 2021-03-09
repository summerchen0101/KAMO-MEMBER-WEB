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
                placeholder="用户名"
                ref={register({
                  required: '不可為空',
                  pattern: {
                    value: pattern.acc,
                    message: '格式有誤',
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
                ref={register({ required: '不可為空' })}
                placeholder="密码"
              />
            </Box>
          </Box>
          <Box className="formGroup" mb="20px">
            <Box className="formInputGroup">
              <i className="iconfont ic-password"></i>
              <input
                type="password"
                className="formInput"
                name="pass"
                ref={register({ required: '不可為空' })}
                placeholder="确认密码"
              />
            </Box>
          </Box>
          <HStack mb="20px">
            <Box className="formGroup">
              <Box className="formInputGroup">
                <i className="iconfont ic-verify"></i>
                <input
                  type="text"
                  className="formInput"
                  name="code"
                  placeholder="請輸入驗證碼"
                  ref={register({ required: '不可為空' })}
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
              <Text fontSize="14px">
                我已阅读并同意
                <span className="text-gold">相关条款和隐私政策。</span>
              </Text>
            </FormLabel>
          </Flex>

          <button type="submit" className="btnbase primary_btn">
            注册
          </button>
          <Center mt="15px">
            <Box fontSize="14px" color="brand.500" cursor="pointer">
              <Link href="/login"> 已有账户？</Link>
            </Box>
            <Box w="2px" h="14px" bg="rgba(255, 255, 255, .3)" mx="10px"></Box>
            <Box fontSize="14px" color="#fff" cursor="pointer">
              <Link href="/home"> 先去逛逛</Link>
            </Box>
          </Center>
        </Box>
      </Box>
    </Center>
  )
}

export default login
