import { useListPagination } from './pagination'
import { useListSelection } from './selection'

type UseListOptions<T, U> = {
  defaultPageSize: number
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

export function useList<T, U>(
  dataList: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  const data = dataList.filter(filterFn)
  const selection = useListSelection(data, getId)
  const { index, pageSize, ...pagination } = useListPagination(
    data,
    defaultPageSize
  )

  return {
    list: data.sort(sortFn).slice(index, index + pageSize),
    pageSize,
    ...pagination,
    ...selection
  }
}
