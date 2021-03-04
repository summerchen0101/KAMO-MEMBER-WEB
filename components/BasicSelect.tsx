import { OptionType } from '@/lib/types'
import { Select, SelectProps } from '@chakra-ui/select'
import React, { useEffect } from 'react'

interface BasicSelectProps<T> extends SelectProps {
  options: OptionType<T>[]
}
function BasicSelect<T extends string | number | readonly string[]>(
  { options, ...props }: BasicSelectProps<T>,
  ref,
) {
  return (
    <Select
      color="gray.500"
      bgColor="#f2f2f2"
      borderColor="rgb(235, 235, 235)"
      borderRadius="3px"
      h="45px"
      placeholder="请选择"
      _focus={{ borderColor: 'gray.200' }}
      ref={ref}
      {...props}
    >
      {options.map((t, i) => (
        <option key={i} value={t.value}>
          {t.label}
        </option>
      ))}
    </Select>
  )
}

export default React.forwardRef(BasicSelect)
