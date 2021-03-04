import { OptionType } from '@/lib/types'
import { Box, BoxProps } from '@chakra-ui/layout'
import classNames from 'classnames'
import React from 'react'

interface PageTabGroupProps<T> {
  options: OptionType<T>[]
  onChange: (value: T) => void
  value: T
}

function PageTabGroup<T>({
  options,
  onChange,
  value,
  ...props
}: PageTabGroupProps<T> & BoxProps) {
  return (
    <Box as="ul" className="nav nav-tabs" {...props}>
      {options.map((t, i) => (
        <li key={i} className="nav-item" onClick={() => onChange(t.value)}>
          <Box
            as="a"
            cursor="pointer"
            className={classNames('nav-link', { active: t.value === value })}
          >
            {t.label}
          </Box>
        </li>
      ))}
    </Box>
  )
}

export default PageTabGroup
