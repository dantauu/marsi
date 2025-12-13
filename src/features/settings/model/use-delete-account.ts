import { useDeleteUserMutation } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"
import { useNavigate } from "@tanstack/react-router"
import { setToken } from "@/redux/slices/auth.ts"

export const useDeleteAccount = () => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const { userToken } = useCurrentUser()
  const { notify } = useNotify()
  const navigate = useNavigate()

  const handleDeleteUser = async () => {
    if (!userToken) return
    try {
      await notify(deleteUser(userToken.userId).unwrap(), {
        success: "Аккаунт удалён",
        error: "Что-то пошло не так",
      })

      setToken(null)
      await navigate({ to: "/deleted" })
    } catch (e) {
      console.error(e)
    }
  }

  return { handleDeleteUser, isLoading }
}
