import { OptionType } from '@/lib/types'
import { Select, SelectProps } from '@chakra-ui/select'
import React, { useEffect } from 'react'

import { MdArrowDropDown } from 'react-icons/md'
interface BasicSelectProps<T> extends SelectProps {
  options: OptionType<T>[]
}
function BasicSelect<T extends string | number | readonly string[]>(
  { options, ...props }: BasicSelectProps<T>,
  ref,
) {
  return (
    <Select
      icon={<MdArrowDropDown />}
      color="gray.600"
      bgColor="#fff"
      fontSize="15px"
      borderColor="border.500"
      borderRadius="4px"
      h="40px"
      placeholder="请选择"
      _focus={{ borderColor: 'brand.500', boxShadow: '0 0 20px 0 #f2eada' }}
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
