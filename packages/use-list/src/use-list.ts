import { useListPagination } from './pagination'
import { useListSelection } from './selection'

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

type UseListOptions<T, U> = {
  defaultPageSize: number
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

type UseListParamsType<T, U> = AtLeastOne<UseListOptions<T, U>>

export function useList<T, U>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListParamsType<T, U>
) {
  const data = dataList.filter(filterFn ?? (() => true))
  const selection = useListSelection(data, getId ?? (() => null))
  const { index, pageSize, ...pagination } = useListPagination(
    data,
    defaultPageSize || 5
  )

  return {
    list: data.sort(sortFn || (() => 0)).slice(index, index + pageSize),
    ...(defaultPageSize && { pageSize }),
    ...(defaultPageSize && pagination),
    ...(getId && selection)
  }
}
