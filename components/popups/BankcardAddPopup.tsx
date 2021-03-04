import { useGlobalProvider } from '@/context/GlobalProvider'
import { usePopupContext } from '@/context/PopupContext'
import { bankCodeOpts } from '@/lib/options'
import useHelper from '@/utils/useHelper'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import useTransfer from '@/utils/useTransfer'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, SimpleGrid } from '@chakra-ui/layout'
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/modal'
import { Select } from '@chakra-ui/select'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { useForm } from 'react-hook-form'
import BasicPopup from '../BasicPopup'
import BasicSelect from '../BasicSelect'
import FieldValidateMessage from '../FieldValidateMessage'
import ImageUpload from '../ImageUpload'

interface FormProps {
  name: string
  branch: string
  acc: string
  person: string
  img: string
  is_default: boolean
}

function BankcardAddPopup() {
  const [visible, setVisible] = usePopupContext('bankcardAdd')
  const { register, handleSubmit, errors, reset } = useForm<FormProps>()
  const API = useRequest()
  const toast = useToast()
  const { toOptionName } = useTransfer()
  const { getBase64 } = useHelper()
  const { fetchMemberBankList } = useService()

  const onSubmit = handleSubmit(async (d) => {
    try {
      await API.createMemberBank({
        name: toOptionName(bankCodeOpts, d.name),
        branch: d.branch,
        acc: d.acc,
        person: d.person,
        img: await getBase64(d.img[0]),
        is_default: d.is_default,
      })
      toast({ status: 'success', title: '更新成功' })
      fetchMemberBankList()
      onClose()
      reset()
    } catch (err) {}
  })
  const onClose = () => {
    setVisible(false)
    reset()
  }
  return (
    <BasicPopup isOpen={visible} onClose={onClose} size="xl">
      <Box as="form" className="form" onSubmit={onSubmit}>
        <ModalHeader>
          <h2 className="main-title center">添加银行卡</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          <SimpleGrid spacingX="20px" columns={2}>
            <FormControl className="form-group">
              <FormLabel>银行名称</FormLabel>
              <BasicSelect
                placeholder="请选择银行"
                name="name"
                ref={register({ required: '不可為空' })}
                options={bankCodeOpts}
              />
              <FieldValidateMessage error={errors.name} />
            </FormControl>
            <FormControl className="form-group">
              <FormLabel>分行/分部名称</FormLabel>
              <Input
                className="form-input"
                placeholder="请输入分行/分部名称"
                name="branch"
                ref={register({ required: '不可為空' })}
              />
              <FieldValidateMessage error={errors.branch} />
            </FormControl>
            <FormControl className="form-group">
              <FormLabel>银行帐号</FormLabel>
              <Input
                className="form-input"
                placeholder="请输入银行帐号"
                name="acc"
                ref={register({ required: '不可為空' })}
              />
              <FieldValidateMessage error={errors.acc} />
            </FormControl>
            <FormControl className="form-group">
              <FormLabel>帐户名称</FormLabel>
              <Input
                className="form-input"
                placeholder="请输入帐户名称"
                name="person"
                ref={register({ required: '不可為空' })}
              />
              <FieldValidateMessage error={errors.person} />
            </FormControl>
          </SimpleGrid>

          <FormControl className="form-group">
            <FormLabel>照片上传</FormLabel>
            <ImageUpload name="img" ref={register({ required: '不可為空' })} />
            <FieldValidateMessage error={errors.img} />
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

export default BankcardAddPopup
