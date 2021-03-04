import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import pattern from '@/lib/pattern'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, HStack, Text } from '@chakra-ui/layout'
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

function ForgetPopup() {
  const [visible, setVisible] = usePopupContext('forgetPw')
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
          <h2 className="main-title center">忘記密碼</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py="50px" textAlign="center">
          <Image m="auto" src="/img/forge_pw.png" width="70%" height="auto" />
          <p className="py-2 mt-4">请联络客服</p>
          <Text className="text-blue" fontSize="23px">
            0938-11002678
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ForgetPopup
