import { type Control, Controller } from "react-hook-form"
import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import type { EditFormFields } from "@/app/types/global.ts"
import type { JSX } from "react"
import { CityEdit, EditGoal, EditHobbies, GenderEdit, NameEdit } from "@/ui"
import { InputEdit } from "@/shared/ui/inputs/profile-edit"

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
        render={({ field }) => (
          <InputEdit
            placeholder="Введите ваш возраст (от 16)"
            showErrors={showErrors}
            {...field}
          />
        )}
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
    title: "Ваш рост",
    render: ({ control, name, showErrors }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputEdit
            placeholder="Введите ваш рост (от 140 до 220)"
            showErrors={showErrors}
            {...field}
          />
        )}
      />
    ),
  },
  hobbies: {
    title: "Увлечения",
    render: ({ control }) => (
      <Controller<EditFormSchema, "hobbies">
        name={"hobbies"}
        control={control}
        render={({ field }) => <EditHobbies {...field} />}
      />
    ),
  },
}
