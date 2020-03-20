import { useEffect } from 'react'

const useFocusable = (input, label) => {
  const focusInput = e => {
    if (e.key === '/' && input) input.current.focus()
  }
  useEffect(() => {
    document.addEventListener('keyup', focusInput)
    return () => {
      document.removeEventListener('keyup', focusInput)
    }
  }, [])

  return label
}

export default useFocusable
