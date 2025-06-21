import { useRouter } from "@tanstack/react-router"
import { useEffect } from "react"

export const useRedirect = ({ path }: {path: string}) => {
  const router = useRouter()
  useEffect(() => {
    router.navigate({ to: path, replace: true })
  }, [router])
  return null
}