import { useAppSelector } from "@/redux/hooks.ts"
import { parseToken } from "@/lib/utils/jwt"

export const useUserId = () => {
  const token = useAppSelector((state) => state.auth.token)
  const payload = parseToken(token)
  const userDataToken = payload
    ? {
        userId: payload?.sub ?? null,
      }
    : null

  return { userDataToken }
}
