export function useList<T>(data: Array<T>) {
  return {
    list: data
      .filter(() => true)
      .sort(() => 0)
      .slice()
  }
}
