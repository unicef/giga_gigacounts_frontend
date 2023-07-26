import { useState } from 'react'

export const useModal = (defaultOpen = false) => {
  const [modal, setModal] = useState(defaultOpen)
  return {
    value: modal,
    open: () => setModal(true),
    close: () => setModal(false),
    toggle: () => setModal((prev) => !prev),
    set: setModal
  } as const
}
