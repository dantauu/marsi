import { useEffect, useRef } from "react"

export const useEventListener = (
  eventType: string,
  callback: (e: MediaQueryListEvent) => void,
  element: MediaQueryList | null
) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element === null) return
    const handler = (e: any) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => removeEventListener(eventType, handler)
  }, [eventType, element])
}
