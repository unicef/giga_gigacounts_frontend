import { RefObject, useEffect } from 'react'

export const useOnClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: (event: Event) => void) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback, ref])
}
