import React from 'react'

type UseListOptions<T, U> = {
  getId: (element: T) => U
}

export function useList<T, U>(data: Array<T>, { getId }: UseListOptions<T, U>) {
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
    list: data
      .filter(() => true)
      .sort(() => 0)
      .slice(),
    selection,
    toogleSelection
  }
}
