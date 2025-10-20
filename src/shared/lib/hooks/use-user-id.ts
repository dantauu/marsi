import { useAppSelector } from "@/redux/hooks.ts"
import { parseToken } from "@/lib/utils/jwt"

export const useUserId = () => {
  const token = useAppSelector((state) => state.auth.token)
  console.log("token:", token)
  const payload = parseToken(token)
  console.log("payload:", payload)

  return payload?.sub ?? null
}
