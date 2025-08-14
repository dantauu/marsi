import { useRouter } from "@tanstack/react-router"
import { useRef, useState } from "react"

export const useUnsavedChanges = (isDirty: boolean) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const nextPath = useRef<string | null>(null)

  const guardedNavigate = (to: string) => {
    if (isDirty) {
      nextPath.current = to
      setShowModal(true)
    } else {
      router.navigate({ to })
    }
  }

  const confirmLeave = () => {
    if (nextPath.current) {
      router.navigate({ to: nextPath.current })
      nextPath.current = null
    }
  }
  return { showModal, setShowModal, confirmLeave, navigate: guardedNavigate }
}