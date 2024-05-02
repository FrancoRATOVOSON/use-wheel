import React from 'react'

export function useListSelection<T, U>(
  data: Array<T>,
  getId: (element: T) => U
) {
  const [selection, setSelection] = React.useState<Set<U>>(new Set([]))

  React.useEffect(() => {
    setSelection(new Set([]))
  }, [data.length])

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

  const toogleSelectionAll = React.useCallback(
    (state?: boolean) =>
      setSelection(currentSelection => {
        if (state || currentSelection.size === 0)
          return new Set(data.map(item => getId(item)))
        const selectionList = new Set(currentSelection)
        selectionList.clear()
        return selectionList
      }),
    [data, getId]
  )

  return { selection, toogleSelection, toogleSelectionAll }
}
