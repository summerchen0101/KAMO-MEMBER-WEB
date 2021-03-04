import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import pattern from '@/lib/pattern'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, HStack } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FieldValidateMessage from '../FieldValidateMessage'

type LoginFormData = {
  acc: string
  pass: string
  code: string
}

function LoginPopup() {
  const [visible, setVisible] = usePopupContext('login')
  const { token, setToken } = useGlobalProvider()
  const API = useRequest()
  const { copyToClipboard } = useHelper()
  const [captchaImg, setCaptchaImg] = useState('')
  const { register, handleSubmit, errors, getValues } = useForm<LoginFormData>()
  const onSubmit = handleSubmit(async (d) => {
    try {
      const res = await API.login({
        acc: d.acc,
        pass: d.pass,
        code: d.code,
        token,
      })
      setToken(res.data.token)
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
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <h2 className="main-title center">欢迎登录</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" className="form" onSubmit={onSubmit}>
            <div className="form-title">欢迎登入</div>
            <Box className="form-group">
              <input
                type="text"
                className="form-input account-input"
                name="acc"
                placeholder="請輸入帳號"
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

            <div className="form-group">
              <input
                type="password"
                className="form-input"
                name="pass"
                ref={register({ required: '不可為空' })}
                placeholder="请输入密码"
              />
              {/* <i className="iconfont iconeye-close btn_eye" /> */}
            </div>
            <HStack>
              <Box className="form-group" w="80%">
                <input
                  type="text"
                  className="form-input"
                  name="code"
                  placeholder="請輸入驗證碼"
                  ref={register({ required: '不可為空' })}
                />
                <FieldValidateMessage error={errors.code} />
              </Box>
              <Image src={captchaImg} onClick={() => fetchCaptcha()} />
            </HStack>
            {/* <label className="form-checkbox ">
            <input className="input-check" name="sort" type="checkbox" />
            <span className="checkmark" />
            <p className="ft-15 text-lighgray">记忆帐密</p>
          </label> */}
          </Box>
        </ModalBody>

        <ModalFooter>
          <button type="submit" className="btnbase primary_btn mt-4 mb-2">
            登入
          </button>
          <button type="button" className="btnbase forget_pwd">
            忘记密码
          </button>
          {/* <Button colorScheme="brand" mr={3} onClick={() => setVisible(false)}>
            登录
          </Button>
          <Button variant="ghost">忘記密碼</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginPopup
