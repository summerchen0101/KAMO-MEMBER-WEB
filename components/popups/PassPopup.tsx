import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import pattern from '@/lib/pattern'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
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

function PassPopup() {
  const [visible, setVisible] = usePopupContext('pass')
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset, watch } = useForm<{
    old_pass: string
    pass: string
    pass_confirm: string
  }>()
  const API = useRequest()
  const toast = useToast()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.updatePw({
        old_pass: d.old_pass,
        pass: d.pass,
      })
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
          <h2 className="main-title center">密码设定</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          <FormControl className="form-group">
            <FormLabel>旧密码</FormLabel>
            <Input
              type="password"
              className="form-input"
              placeholder="请输入旧密码"
              name="old_pass"
              ref={register({ required: '不可為空' })}
            />
            <FieldValidateMessage error={errors.old_pass} />
          </FormControl>
          <FormControl className="form-group">
            <FormLabel>新密码</FormLabel>
            <Input
              type="password"
              className="form-input"
              placeholder="请输入新密码"
              name="pass"
              ref={register({
                required: '不可為空',
                pattern: {
                  value: pattern.pass,
                  message: '格式有誤',
                },
              })}
            />
            <FieldValidateMessage error={errors.pass} />
          </FormControl>
          <FormControl className="form-group">
            <FormLabel>新密码确认</FormLabel>
            <Input
              className="form-input"
              placeholder="请再次输入新密码"
              name="pass_confirm"
              type="password"
              ref={register({
                required: '不可為空',
                validate: (value) =>
                  value !== watch('pass') ? '密码不同' : true,
              })}
            />
            <FieldValidateMessage error={errors.pass_confirm} />
          </FormControl>
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

export default PassPopup
