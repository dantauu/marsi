import type { EditFormSchema } from "@/lib/schema/profile-edit"
import { type JSX } from "react"
import type { User } from "./user"

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
  Locations,
  Goals,
  Hobbies,
  UserCardGrid,
  UserCardExpanded,
  EditFormFields,
  FilteredUsers,
}
