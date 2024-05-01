import React from 'react'

type UseListOptions<T, U> = {
  filterFn: (element: T) => boolean
  getId: (element: T) => U
  sortFn: (elementA: T, elementB: T) => number
}

export function useList<T, U>(
  data: Array<T>,
  { filterFn, getId, sortFn }: UseListOptions<T, U>
) {
  const [selection, setSelection] = React.useState<Set<U>>(new Set([]))

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

  return {
    list: data.filter(filterFn).sort(sortFn).slice(),
    selection,
    toogleSelection
  }
}
