import { Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/modal'
import React from 'react'

function BasicPopup({ children, ...props }: ModalProps) {
  return (
    <Modal size="sm" motionPreset="slideInBottom" autoFocus={false} {...props}>
      <ModalOverlay />
      <ModalContent p="3">{children}</ModalContent>
    </Modal>
  )
}

export default BasicPopup
