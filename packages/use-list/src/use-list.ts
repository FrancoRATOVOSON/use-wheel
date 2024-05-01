import React from 'react'

type UseListOptions<T, U> = {
  defaultPageSize: number
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

export function useList<T, U>(
  data: Array<T>,
  { defaultPageSize, filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  const [selection, setSelection] = React.useState<Set<U>>(new Set([]))
  const [pageSize, setPageSize] = React.useState<number>(defaultPageSize)
  const [index, setIndex] = React.useState<number>(0)

  const toogleSelection = React.useCallback(
    (item: T, state?: boolean) =>
      setSelection(currentSelection => {
        const itemId = getId(item)
        const selectionList = new Set(currentSelection)
        if (state || !selectionList.has(itemId)) selectionList.add(itemId)
        else selectionList.delete(itemId)
        return new Set(selectionList)
      }),
    [getId]
  )

  const currentPage = React.useMemo(
    () => index / pageSize + 1,
    [index, pageSize]
  )

  const pageCount = React.useMemo(() => {
    if (pageSize >= data.length) return 1
    return Math.ceil(data.length / pageSize)
  }, [data.length, pageSize])

  const nextPage = React.useCallback(() => {
    if (pageSize < data.length && index + pageSize < data.length)
      setIndex(currentIndex => currentIndex + pageSize)
  }, [data.length, index, pageSize])

  const previousPage = React.useCallback(() => {
    if (pageSize < data.length && index - pageSize >= 0)
      setIndex(currentIndex => currentIndex - pageSize)
  }, [data.length, index, pageSize])

  const firstPage = React.useCallback(() => setIndex(0), [])

  const lastPage = React.useCallback(() => {
    if (pageSize < data.length && index + pageSize < data.length)
      setIndex(pageSize * pageCount)
  }, [data.length, index, pageCount, pageSize])

  return {
    currentPage,
    firstPage,
    lastPage,
    list: data
      .filter(filterFn)
      .sort(sortFn)
      .slice(index, index + pageSize),
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    selection,
    setPageSize,
    toogleSelection
  }
}
