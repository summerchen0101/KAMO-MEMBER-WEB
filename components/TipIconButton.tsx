import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'
import React from 'react'

type TipIconButtonProps = {
  label: string
  icon: JSX.Element
}

const TipIconButton: React.FC<
  TipIconButtonProps & Omit<IconButtonProps, 'aria-label'>
> = ({ label, ...rest }) => {
  return (
    <Tooltip label={label}>
      <IconButton
        size="sm"
        fontSize="18px"
        borderRadius="0"
        aria-label={label}
        {...rest}
      />
    </Tooltip>
  )
}

export default TipIconButton
