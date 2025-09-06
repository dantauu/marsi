import { useEffect, useState } from "react"
//this hook delete item from DOM after open keyboard
export const useKeyboardOpen = () => {
  const [visibleKeyboard, setVisibleKeyboard] = useState(false)
  const [initialHeight, setInitialHeight] = useState<number | null>(null)
  useEffect(() => {
    const onResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight
      if (!initialHeight) {
        setInitialHeight(currentHeight)
        return
      }
      const keyBoardOpen = initialHeight - currentHeight > 150
      setVisibleKeyboard(keyBoardOpen)
    }

    window.visualViewport?.addEventListener("resize", onResize)
    return () => window.visualViewport?.removeEventListener("resize", onResize)
  }, [initialHeight])
  return visibleKeyboard
}
