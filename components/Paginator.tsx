import { usePaginationContext } from '@/context/PaginationProvider'
import { Box, Text } from '@chakra-ui/layout'
import React, { useCallback, useEffect, useMemo } from 'react'
import { Pagination } from 'react-bootstrap'
type PaginatorProps = {
  displayCount?: number
}
const Paginator: React.FC<PaginatorProps> = ({ displayCount = 5 }) => {
  const { page, setPage, totalPages, totalCount } = usePaginationContext()
  useEffect(() => {
    setPage(1)
  }, [totalPages])
  const fixedCount = useMemo(() => {
    const _f = Math.floor(displayCount / 2)
    return page > _f ? _f : page + 1 - _f
  }, [displayCount, page])
  const indexToPage = useCallback((index) => page + index - fixedCount, [
    page,
    fixedCount,
  ])
  if (!totalPages) return <></>
  return (
    <Box mt="10px">
      <Pagination className="d-flex justify-content-center">
        <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
        <Pagination.Prev
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        />
        {[...Array(displayCount)].map((_, i) => (
          <Pagination.Item
            key={i}
            hidden={totalPages < indexToPage(i)}
            active={indexToPage(i) === page}
            onClick={() => setPage(indexToPage(i))}
          >
            {indexToPage(i)}
          </Pagination.Item>
        ))}
        {/* <Pagination.Item>{page - 1}</Pagination.Item>
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item>{page + 1}</Pagination.Item> */}
        <Pagination.Next
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        />
        <Pagination.Last
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        />
      </Pagination>
      <Text mt="1" textAlign="center" fontSize="14px" color="gray">
        共 {totalPages} 頁 <span hidden={!totalCount}>({totalCount} 筆)</span>
      </Text>
    </Box>
  )
}

export default Paginator
