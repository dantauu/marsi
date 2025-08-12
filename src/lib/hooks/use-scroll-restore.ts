import { useEffect } from "react"

export function useScrollRestore(key: string, deps: any[] = []) {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${key}`)
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10))
    }
  }, [key, ...deps])

  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY))
    }
    window.addEventListener("scroll", saveScroll)
    return () => window.removeEventListener("scroll", saveScroll)
  }, [key])
}
