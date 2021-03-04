import { OptionType } from '@/lib/types'
import moment from 'moment'
import numeral from 'numeral'
import { useCallback } from 'react'

const useTransfer = () => {
  const toDateTime = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD HH:mm:ss')
  const toDate = (unixTime: number) =>
    moment(unixTime * 1000).format('YYYY-MM-DD')
  const isBeforeDay = (unixTime: number) =>
    moment(unixTime * 1000).isBefore(moment(), 'day')

  const toCurrency = (num: number, decimal?: number) =>
    numeral(num).format(
      decimal ? `0,0.${Array(decimal).fill('0').join('')}` : '0,0',
    )

  const toOptionName = function <T extends string | number>(
    options: OptionType<T>[],
    code: number | string,
  ): string {
    return options.find((t) => t.value === code)?.label
  }

  const toDateRange = useCallback((rangeType: string) => {
    switch (rangeType) {
      case 'today':
        return {
          start: moment().startOf('day').unix(),
          end: moment().endOf('day').unix(),
        }
      case 'tomorrow':
        return {
          start: moment().add(1, 'day').startOf('day').unix(),
          end: moment().add(1, 'day').endOf('day').unix(),
        }
      case 'yesterday':
        return {
          start: moment().subtract(1, 'day').startOf('day').unix(),
          end: moment().subtract(1, 'day').endOf('day').unix(),
        }
      case 'thisWeek':
        return {
          start: moment().startOf('week').unix(),
          end: moment().endOf('week').unix(),
        }
      case 'lastWeek':
        return {
          start: moment().subtract(1, 'week').startOf('week').unix(),
          end: moment().subtract(1, 'week').endOf('week').unix(),
        }
      case 'nextWeek':
        return {
          start: moment().add(1, 'week').startOf('week').unix(),
          end: moment().add(1, 'week').endOf('week').unix(),
        }
      case 'thisMonth':
        return {
          start: moment().startOf('month').unix(),
          end: moment().endOf('month').unix(),
        }
      case 'lastMonth':
        return {
          start: moment().subtract(1, 'month').startOf('month').unix(),
          end: moment().subtract(1, 'month').endOf('month').unix(),
        }
    }
    return { start: 0, end: 0 }
  }, [])

  const amountToCanWin = useCallback((amount, odds) => {
    // 手續費5%
    if (amount && odds) {
      return numeral(amount).multiply(odds).multiply(0.95).value()
    }
    return 0
  }, [])

  return {
    toDate,
    toDateTime,
    isBeforeDay,
    toCurrency,
    toDateRange,
    toOptionName,
    amountToCanWin,
  }
}

export default useTransfer
