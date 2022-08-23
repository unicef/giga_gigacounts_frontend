import { useCallback, useEffect, useState } from 'react'

export const useMutiToggle = <T extends string | number | null>(
  init?: (initiate: (item: T | null) => void) => void,
) => {
  const [initiated, setInitiated] = useState(false)
  const [expanded, setExpanded] = useState<T | null>()

  const collapse = () => setExpanded(null)

  const expand = (item: T) => setExpanded(item)

  const toggle = useCallback((item: T | null) => setExpanded((prev) => (prev === item ? null : item)), [])

  useEffect(() => {
    if (!initiated && init) {
      init?.((item: T | null) => {
        toggle(item)
        setInitiated(true)
      })
    }
  }, [init, initiated, toggle])

  return {
    expanded,
    collapse,
    expand,
    toggle,
  }
}
