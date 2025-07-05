import { type Control, Controller } from "react-hook-form"
import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import type { EditFormFields } from "@/app/types/global.ts"
import type { JSX } from "react"
import { AgeEdit, CityEdit, EditGoal, GenderEdit, NameEdit } from "@/ui"

type RenderProps = {
  control: Control<EditFormSchema>
  name: EditFormFields
}

export const FieldMeta: Record<
  EditFormFields,
  {
    title: string
    render: (props: RenderProps & { showErrors: boolean }) => JSX.Element
  }
> = {
  first_name: {
    title: "Имя",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <NameEdit {...field} />}
      />
    ),
  },
  gender: {
    title: "Пол",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <GenderEdit {...field} />}
      />
    ),
  },
  age: {
    title: "Возраст",
    render: ({ control, name, showErrors }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <AgeEdit showErrors={showErrors} {...field} />}
      />
    ),
  },
  city: {
    title: "Город",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <CityEdit {...field} />}
      />
    ),
  },
  goal: {
    title: "Цель",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <EditGoal {...field} />}
      />
    ),
  },
  height: {
    title: "Цель",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <EditGoal {...field} />}
      />
    ),
  },
}