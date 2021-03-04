import { OptionType } from '@/lib/types'
import { Box, BoxProps } from '@chakra-ui/layout'
import classNames from 'classnames'
import React from 'react'
interface TabGroupProps<T> {
  options: OptionType<T>[]
  onChange: (value: T) => void
  value: T
}
function TabGroup<T>({
  options,
  onChange,
  value,
  ...props
}: TabGroupProps<T> & BoxProps) {
  return (
    <Box className="filter-container" {...props}>
      <Box className="status-tab">
        {options.map((t, i) => (
          <Box
            key={i}
            className={classNames('status-switch', {
              active: t.value === value,
            })}
            onClick={() => onChange(t.value)}
          >
            {t.label}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default TabGroup
