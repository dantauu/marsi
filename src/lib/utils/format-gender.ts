export const getGenderFormat = (gender: string | undefined) => {
  if (gender === "female") return "Женский"
  if (gender === "male") return "Мужской"
  return gender
}