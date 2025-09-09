type User = {
  id: string
  first_name: string
  username?: string
  age: number | null
  photo_url: string[] | undefined
  gender: "male" | "female"
  city: string
  goal: string
  hobbies: string[]
  height: string
}

type UpdateUserData = {
  id: string
  first_name?: string | undefined
  age?: number | null
  photo_url?: string[] | undefined
  gender?: string | undefined
  city?: string | undefined
  goal?: string | undefined
  hobbies?: string[] | undefined
  height?: string | undefined
}

type UserInit = {
  id: string
  first_name: string
  photo_url: string[] | undefined
  username?: string | undefined
}

export { User, UpdateUserData, UserInit }
