import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export interface ColumnType<T> {
  title: string
  code?: string
  render?: (value: string, row: T, index: number) => React.ReactNode
}

type BasicTableProps<T> = {
  columns: ColumnType<T>[]
  data: T[]
}

const BasicTable = function <T>({ columns, data }: BasicTableProps<T>) {
  return (
    <Box maxW="100%" overflowX="auto" bg="white" borderRadius="4px" shadow="sm">
      <Table variant="striped" overflow="hidden" whiteSpace="nowrap">
        <Thead bg="brand.500">
          <Tr>
            {columns.map((t, i) => (
              <Th
                key={i}
                whiteSpace="nowrap"
                fontSize="18px"
                color="#fff"
                lineHeight="21px"
              >
                {t.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d, d_i) => (
            <Tr key={d_i} position="relative" background="#fff">
              {columns.map((c, c_i) => (
                <Td
                  key={c_i}
                  whiteSpace="nowrap"
                  verticalAlign="middle"
                  fontSize="15px"
                  padding=".8rem 1.5rem"
                >
                  {c.render ? c.render(d[c.code], d, d_i) : d[c.code]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default BasicTable
