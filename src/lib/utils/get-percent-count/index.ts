import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"

export const usePercentCount = () => {
  const { user } = useCurrentUser()
  const fields = [
    user?.age,
    user?.goal,
    user?.city,
    user?.gender,
    user?.first_name,
  ]

  const fieldCount = fields.filter(Boolean).length
  const percent = fieldCount * 20

  const colors =
    percent <= 20
      ? "#f84963"
      : percent <= 40
        ? "#ff6708"
        : percent <= 60
          ? "#d4aa00"
          : percent <= 80
            ? "#a7cc00"
            : "#31c29f"

  return { colors, percent }
}

export const useAllPercentCount = () => {
  const { user } = useCurrentUser()
  const fields = [
    user?.age,
    user?.goal,
    user?.city,
    user?.gender,
    user?.first_name,
    user?.about_me,
    user?.photo_url,
    user?.hobbies,
    user?.height,
  ]

  const fieldCount = fields.filter(Boolean).length
  const percent = Math.min(fieldCount * (100 / fields.length), 100)

  const colors =
    percent <= 12
      ? "#f84963"
      : percent <= 24
        ? "#f84963"
        : percent <= 36
          ? "#f84963"
          : percent <= 48
            ? "#ff6708"
            : percent <= 60
              ? "#ff6708"
              : percent <= 72
                ? "#a7cc00"
                : percent <= 89
                  ? "#63cc00"
                  : "#31C29F"

  return { colors, percent }
}
