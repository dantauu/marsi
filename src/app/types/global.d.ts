import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import { type JSX } from "react"

type User = {
  id: number
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
  id: number
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
  id: number
  first_name: string
  photo_url: string[] | undefined
  username?: string | undefined
}

type FilteredUsers = {
  minAge: number
  maxAge: number
  minHeight: number
  maxHeight: number
  city: string
  gender: string
  limit: number
  offset: number
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
type UserCardGrid = Omit<
  User,
  "gender" | "goal" | "city" | "hobbies" | "height"
>
type UserCardExpanded = Omit<User, "gender" | "city" | "hobbies">

export type {
  User,
  Locations,
  Goals,
  Hobbies,
  UserCardGrid,
  UserCardExpanded,
  EditFormFields,
  FilteredUsers,
  UserInit,
  UpdateUserData,
}
