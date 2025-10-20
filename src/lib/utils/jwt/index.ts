export interface JwtPayload {
  sub: string
  first_name?: string
  username?: string
  photo_url?: string[]
  iat?: number
  exp?: number
}

export const parseToken = (token: string | null): JwtPayload | null => {
  if (!token) return null
  try {
    const base64url = token.split(".")[1]
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}
