export const getGenderFormat = (gender: string | undefined) => {
  if (gender === "female") return "Женский"
  if (gender === "male") return "Мужской"
  return gender
}

export const getNormalizeGender = (gender: string | undefined) => {
  if (gender === "Женский") return "female"
  if (gender === "Мужской") return "male"
  return gender
}