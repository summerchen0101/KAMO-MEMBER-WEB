import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/modal'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { useForm } from 'react-hook-form'
import BasicPopup from '../BasicPopup'
import FieldValidateMessage from '../FieldValidateMessage'

function EmailPopup() {
  const [visible, setVisible] = usePopupContext('email')
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    email: string
  }>()
  const API = useRequest()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.editUserContact({ ...userContact, ...d })
      toast({ status: 'success', title: '更新成功' })
      onClose()
      reset()
      fetchUserContact()
    } catch (err) {}
  })
  const onClose = () => {
    setVisible(false)
    reset()
  }
  return (
    <BasicPopup isOpen={visible} onClose={onClose}>
      <Box as="form" className="form" onSubmit={onSubmit}>
        <ModalHeader>
          <h2 className="main-title center">电子邮箱修改</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          <FormControl className="form-group">
            <FormLabel>电子邮箱</FormLabel>
            <Input
              className="form-input"
              placeholder="请输入电子邮箱"
              name="email"
              defaultValue={userContact?.email}
              ref={register({ required: '不可為空' })}
            />
            <FieldValidateMessage error={errors.email} />
          </FormControl>
          {/* <FormControl className="form-group">
            <FormLabel>电子邮箱</FormLabel>
            <InputGroup size="md">
              <Input
                pr="100px"
                className="form-input"
                placeholder="请输入电子邮箱"
                name="email"
                defaultValue={userContact?.email}
                ref={register({ required: '不可為空' })}
              />
              <InputRightElement width="100px" height="100%">
                <Button
                  color="brand.500"
                  variant="link"
                  size="sm"
                  onClick={() => {}}
                >
                  获取验证码
                </Button>
              </InputRightElement>
            </InputGroup>

            <FieldValidateMessage error={errors.email} />
          </FormControl> */}
          {/* <FormControl className="form-group">
            <FormLabel>邮箱验证码</FormLabel>
            <Input
              className="form-input"
              placeholder="请输入邮箱验证码"
              name="telegram_id"
              defaultValue={userContact?.telegram_id}
              ref={register({ required: '不可為空' })}
            />
            <FieldValidateMessage error={errors.telegram_id} />
          </FormControl> */}
        </ModalBody>
        <ModalFooter mb="4">
          <button className="btnbase primary_btn" type="submit">
            送出
          </button>
        </ModalFooter>
      </Box>
    </BasicPopup>
  )
}

export default EmailPopup
