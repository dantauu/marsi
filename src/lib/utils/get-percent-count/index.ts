import { useFindUser } from "@/lib/hooks/use-find-user.ts"

export const usePercentCount = () => {
  const { user } = useFindUser()
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
  const { user } = useFindUser()
  const fields = [
    user?.age,
    user?.goal,
    user?.city,
    user?.gender,
    user?.first_name,
    user?.photo_url,
    user?.hobbies,
    user?.height,
  ]

  const fieldCount = fields.filter(Boolean).length
  const percent = fieldCount * 12.5

  const colors =
    percent <= 12.5
      ? "#f84963"
      : percent <= 25
        ? "#f84963"
        : percent <= 37.5
          ? "#f84963"
          : percent <= 50
            ? "#ff6708"
            : percent <= 62.5
              ? "#ff6708"
              : percent <= 75
                ? "#a7cc00"
                : percent <= 87.5
                  ? "#a7cc00"
                  : "#69ff6d"

  return { colors, percent }
}
