import { useGlobalProvider } from '@/context/GlobalProvider'
import { useLoaderProvider } from '@/context/LoaderProvider'
import { usePopupContext } from '@/context/PopupContext'
import { MemberBank } from '@/lib/types'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import Icon from '@chakra-ui/icon'
import { Box, HStack, Text } from '@chakra-ui/layout'
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/modal'
import { Switch } from '@chakra-ui/switch'
import { Table, Tbody, Td, Th, Tr } from '@chakra-ui/table'
import { useToast } from '@chakra-ui/toast'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiCheck } from 'react-icons/hi'
import BasicPopup from '../BasicPopup'
import BasicSelect from '../BasicSelect'
import FieldValidateMessage from '../FieldValidateMessage'

function BankcardListPopup() {
  const [visible, setVisible] = usePopupContext('bankcardList')
  const { register, handleSubmit, errors, reset } = useForm<{ id: number }>()
  const API = useRequest()
  const toast = useToast()
  const { fetchMemberBankList } = useService()
  const { bankcards } = useGlobalProvider()
  const defaultBankcard = useMemo(() => bankcards.find((t) => t.is_default), [
    bankcards,
  ])

  const onRemoveConfirmed = async (id: number) => {
    try {
      await API.removeMemberBank(id)
      await fetchMemberBankList()
      toast({ status: 'success', title: '銀行卡刪除成功' })
    } catch (err) {}
  }
  const onSetDefault = async (id: number) => {
    try {
      await API.setDefaultMemberBank(id)
      await fetchMemberBankList()
    } catch (err) {}
  }
  const onClose = () => {
    setVisible(false)
    reset()
  }
  return (
    <BasicPopup isOpen={visible} onClose={onClose} size="xl">
      <Box as="form" className="form">
        <ModalHeader>
          <h2 className="main-title center">银行卡设置</h2>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt="4">
          <Table mb="8">
            <Tbody>
              <Tr whiteSpace="nowrap">
                <Th fontSize="sm">銀行卡名稱</Th>
                <Th fontSize="sm">預設</Th>
                <Th fontSize="sm">審核</Th>
                <Th fontSize="sm"></Th>
              </Tr>
              {bankcards.map((t, i) => (
                <Tr key={i}>
                  <Td>
                    {t.name} (****{_.takeRight(t.acc, 6).join('')})
                  </Td>
                  <Td verticalAlign="middle">
                    {t.is_confirm ? (
                      <Switch
                        name="id"
                        colorScheme="brand"
                        isChecked={defaultBankcard?.id === t.id}
                        onChange={() => onSetDefault(t.id)}
                      />
                    ) : (
                      '-'
                    )}
                  </Td>
                  <Td verticalAlign="middle">
                    {t.is_confirm ? (
                      <Text color="green.500">
                        <Icon as={HiCheck} fontSize="25px" />
                      </Text>
                    ) : (
                      '-'
                    )}
                  </Td>
                  <Td verticalAlign="middle">
                    <HStack>
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={() => onRemoveConfirmed(t.id)}
                      >
                        刪除
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </ModalBody>
      </Box>
    </BasicPopup>
  )
}

export default BankcardListPopup
