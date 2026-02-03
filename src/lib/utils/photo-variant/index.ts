import type { UserPhotoVariants } from "@/app/types/user.ts"

export const getPhotoVariant = (
  item: UserPhotoVariants | undefined,
  variant: keyof UserPhotoVariants = "medium"
): string | undefined => {
  if (!item) return undefined
  return item[variant]
}
