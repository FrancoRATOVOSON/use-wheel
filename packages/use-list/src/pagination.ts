import React from 'react'

export function useListPagination<T>(data: Array<T>, defaultPageSize: number) {
  const [pageSize, setPageSizeState] = React.useState<number>(defaultPageSize)
  const [index, setIndex] = React.useState<number>(0)

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
      setIndex(pageSize * (pageCount - 1))
  }, [data.length, index, pageCount, pageSize])

  const goToPage = React.useCallback(
    (destinationPage: number) => {
      if (destinationPage < pageCount)
        setIndex(pageSize * (destinationPage - 1))
    },
    [pageCount, pageSize]
  )

  const setPageSize = React.useCallback(
    (size: number) => {
      setPageSizeState(size)
      const newIndex = Math.floor(index / size) * size
      setIndex(newIndex)
    },
    [index]
  )

  return {
    currentPage,
    firstPage,
    goToPage,
    index,
    lastPage,
    nextPage,
    pageCount,
    pageSize,
    previousPage,
    setPageSize
  }
}
