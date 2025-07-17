import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import { type JSX } from "react"

type User = {
  id: string
  first_name: string
  age: string
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
  age?: string | undefined
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
}

type FilteredUsers = {
  minAge: number
  maxAge: number
  minHeight: number
  maxHeight: number
  city: string
  gender: string
}

type Locations = {
  id: number
  name: string
  region: string
}

type Goals = {
  id: number
  title: string
  description: string
  icon: JSX.Element
}

type Hobbies = {
  id: number
  title: string
}

type EditFormFields = keyof EditFormSchemaOmit

//Omits
type EditFormSchemaOmit = Omit<EditFormSchema, "photo_url" | "deleted_photos">
type UserCardSearch = Omit<
  User,
  "gender" | "goal" | "city" | "hobbies" | "height"
>

export type {
  User,
  Locations,
  Goals,
  Hobbies,
  UserCardSearch,
  EditFormFields,
  FilteredUsers,
  UserInit,
  UpdateUserData,
}
