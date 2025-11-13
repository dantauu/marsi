export const getPhotoVariant = (
  photo:
    | string
    | { profile: string; card: string; "card-full": string }
    | undefined,
  variant: "profile" | "card" | "card-full" = "profile"
): string | undefined => {
  if (!photo) return undefined
  return typeof photo === "string" ? photo : photo[variant]
}
