import { useCallback, useState } from 'react'

export function useToggle(defaultValue?: boolean) {
  const [state, setState] = useState(!!defaultValue)

  const toggle = useCallback(() => {
    setState((x) => !x)
  }, [])

  return [state, toggle, setState] as const
}
