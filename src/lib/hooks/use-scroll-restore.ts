// hooks/useScrollRestore.ts
import { useEffect } from "react"

export function useScrollRestore(key: string) {
  // восстановление при монтировании
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${key}`)
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10))
    }
  }, [key])

  // сохранение перед размонтированием
  useEffect(() => {
    return () => {
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY))
    }
  }, [key])
}
