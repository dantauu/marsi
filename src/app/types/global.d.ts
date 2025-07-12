import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import { type JSX } from "react"

type UserCard = {
  id: number
  first_name: string
  age: string
  photo_url: string | undefined
  gender: "male" | "female"
  city: string
  goal: string
  hobbies: []
  height: string
}

type UserInit = {
  id: number
  first_name: string
  photo_url: string | undefined
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
type EditFormSchemaOmit = Omit<EditFormSchema, "photo_url">
type UserCardSearch = Omit<
  UserCard,
  "gender" | "goal" | "city" | "hobbies" | "height"
>

export type {
  UserCard,
  Locations,
  Goals,
  Hobbies,
  UserCardSearch,
  EditFormFields,
  FilteredUsers,
  UserInit,
}
