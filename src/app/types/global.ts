import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import { type JSX } from "react"

export type UserCard = {
  id?: number
  username: string
  age: number
  avatar: string | undefined
  gender: "male" | "female"
  city: string
  goal: string
}

export type UserCardSearch = Omit<UserCard, "gender" | "goal" | "city">

export type Locations = {
  id: number
  name: string
  region: string
}

export type Goals = {
  id: number
  title: string
  description: string
  icon: JSX.Element
}

enum LikesTab {
  MUTUAL = "mutual",
  INCOMING = "incoming",
}

type EditFormSchemaOmit = Omit<EditFormSchema, "photo_url">
export type EditFormFields = keyof EditFormSchemaOmit

export { LikesTab }
