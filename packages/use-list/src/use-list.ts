import React from 'react'

import { useListPagination } from './pagination'
import { useListSelection } from './selection'

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type PaginationType = {
  defaultPageSize: number
}

export type SelectionType<T, U> = {
  getId: (element: T) => U
}

export type OrderAndFilter<T> = {
  filterFn: (element: T) => boolean
  sortFn: (elementA: T, elementB: T) => number
}

export type UseListOptions<T, U> = OrderAndFilter<T> &
  PaginationType &
  SelectionType<T, U>

type UseListParamsType<T, U> = AtLeastOne<UseListOptions<T, U>>

type ListWithPagination<T> = Omit<
  ReturnType<typeof useListPagination<T>>,
  'index'
>
type ListWithSelection<T, U> = ReturnType<typeof useListSelection<T, U>>

type ListWithPaginationAndSelection<T, U> = ListWithPagination<T> &
  ListWithSelection<T, U>

type UseListReturnType<T, U, V> = {
  list: Array<T>
} & (V extends PaginationType
  ? V extends SelectionType<T, U>
    ? ListWithPaginationAndSelection<T, U>
    : ListWithPagination<T>
  : V extends SelectionType<T, U>
    ? ListWithSelection<T, U>
    : { list: Array<T> })

export function useList<T, U, V extends UseListParamsType<T, U>>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: V
): UseListReturnType<T, U, V> {
  const data = React.useMemo(
    () => dataList.filter(filterFn ?? (() => true)),
    [dataList, filterFn]
  )

  const selection = useListSelection(data, getId ?? (() => ({}) as U))
  const { index, pageSize, ...pagination } = useListPagination(
    data,
    defaultPageSize || 5
  )

  const list = React.useMemo(() => {
    if (!sortFn && !defaultPageSize) return [...data]
    if (sortFn && !defaultPageSize) return [...data].sort(sortFn)
    if (!sortFn && defaultPageSize) return data.slice(index, index + pageSize)

    return [...data].sort(sortFn).slice(index, index + pageSize)
  }, [data, defaultPageSize, index, pageSize, sortFn])

  return {
    list,
    ...(defaultPageSize && { pageSize }),
    ...(defaultPageSize && pagination),
    ...(getId && selection)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
}

type UseRichListType = {
  <U>(): <T, V extends UseListParamsType<T, U>>(
    dataList: Array<T>,
    params: V
  ) => UseListReturnType<T, U, V>
}

export const useRichList: UseRichListType = function <U>() {
  return function <T, V extends UseListParamsType<T, U>>(
    data: Array<T>,
    params: V
  ): UseListReturnType<T, U, V> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useList(data, params)
  }
}
