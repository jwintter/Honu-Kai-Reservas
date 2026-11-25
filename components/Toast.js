import { useCallback, useRef, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)
  const timer = useRef()
  const avisar = useCallback((msg, tipo = 'success') => {
    clearTimeout(timer.current)
    setToast({ msg, tipo })
    timer.current = setTimeout(() => setToast(null), 4500)
  }, [])
  const elemento = toast ? <div role="status" className={`toast toast-${toast.tipo}`}>{toast.msg}</div> : null
  return [avisar, elemento]
}
