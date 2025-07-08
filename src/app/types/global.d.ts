import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import { type JSX } from "react"

type UserCard = {
  id?: number
  username: string
  age: number
  avatar: string | undefined
  gender: "male" | "female"
  city: string
  goal: string
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
type UserCardSearch = Omit<UserCard, "gender" | "goal" | "city">

export type { UserCard, Locations, Goals, Hobbies, UserCardSearch, EditFormFields }
