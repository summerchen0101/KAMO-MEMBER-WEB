import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
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

function WechatPopup() {
  const [visible, setVisible] = usePopupContext('wechat')
  const { fetchUserContact } = useService()
  const { userContact } = useGlobalProvider()
  const { register, handleSubmit, errors, reset } = useForm<{
    wechat_id: string
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
          <h2 className="main-title center">微信帐号修改</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          <FormControl className="form-group">
            <FormLabel>微信帐号</FormLabel>
            <Input
              className="form-input"
              placeholder="请输入微信帐号"
              name="wechat_id"
              defaultValue={userContact?.wechat_id}
              ref={register({ required: '不可為空' })}
            />
            <FieldValidateMessage error={errors.wechat_id} />
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

export default WechatPopup
