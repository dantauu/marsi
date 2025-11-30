export const getPhotoVariant = (
  photo: { large: string; small: string; medium: string }
    | undefined,
  variant: "large" | "small" | "medium" = "medium"
): string | undefined => {
  if (!photo) return undefined
  return typeof photo === "string" ? photo : photo[variant]
}
