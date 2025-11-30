type User = {
  id: string
  first_name: string
  username?: string
  age: number | null
  photo_url: UserPhotos | undefined
  gender: "male" | "female"
  city: string
  about_me?: string | null
  goal: string
  hobbies: string[]
  height: string
}

type UpdateUserData = {
  id: string
  first_name?: string | undefined
  age?: number | null
  photo_url?: UserPhotos | undefined
  gender?: string | undefined
  city?: string | undefined
  about_me?: string | undefined
  goal?: string | undefined
  hobbies?: string[] | undefined
  height?: string | undefined
}

type UserInit = {
  id: string
  first_name: string
  photo_url: UserPhotoDefault | undefined
  username?: string | undefined
}

type UserPhotos = {
  default: string
  items: UserPhotoVariants[]
}

type UserPhotoVariants = {
  small: string,
  medium: string,
  large: string
}

export { User, UpdateUserData, UserInit, UserPhotos, UserPhotoVariants }
