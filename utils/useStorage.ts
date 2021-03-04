import { useEffect, useState } from 'react'
import store from 'store2'

const useStorage = function <T>(name: string, initValue: T) {
  const [value, setValue] = useState<T>(store.session.get(name) ?? initValue)

  useEffect(() => {
    store.session.set(name, value)
  }, [value])
  return [value, setValue] as const
}

export default useStorage
