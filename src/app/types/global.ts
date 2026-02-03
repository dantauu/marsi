import type { EditFormSchema } from "@/lib/schemes/profile-edit"
import React, { type JSX } from "react"
import type { User, UserPhotoVariants } from "./user.ts"

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

type UserCardGridProps = {
  photo_url: string
  first_name: string
  age: number | null
  id: string
}

type UserCardExpandedProps = {
  id: string
  first_name: string
  photo_url: string
  age: number | null
  goal: string
  height: string
}

type SortablePhotoProps = {
  photo: UserPhotoVariants
  index: number
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onRemove: (index: number) => void
  isLoading: boolean
}

export type {
  Locations,
  Goals,
  Hobbies,
  UserCardGrid,
  UserCardExpanded,
  EditFormFields,
  FilteredUsers,
  UserCardGridProps,
  UserCardExpandedProps,
  SortablePhotoProps,
}
