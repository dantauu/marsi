import { type JSX, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { openEditModal, closeEditModal } from "@/redux/slices/modal-slice"
import { EditModal } from "@/widgets/modals/edit-modal"
import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context"
import type { EditFormFields } from "@/app/types/global"
import { type Control, Controller, useWatch } from "react-hook-form"
import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import Button from "@/shared/ui/buttons/button.tsx"

export const EditMainInfo = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const {
    control,
    formState: { errors },
  } = form
  const dispatch = useAppDispatch()
  const { isEditOpen } = useAppSelector((state) => state.modal)

  const [currentField, setCurrentField] = useState<
    keyof typeof FieldMeta | null
  >(null)

  const error = currentField ? errors[currentField]?.message : null

  const handleOpen = (key: EditFormFields) => {
    dispatch(openEditModal())
    setCurrentField(key)
  }

  const handleSave = () => {
    dispatch(closeEditModal())
    setCurrentField(null)
  }

  const first_name = useWatch({ control, name: "first_name" })
  const gender = useWatch({ control, name: "gender" })
  const age = useWatch({ control, name: "age" })
  console.log("ERRORS", errors)
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ItemEdit
        title="Имя"
        text={first_name}
        onClick={() => handleOpen("first_name")}
      />
      <ItemEdit
        title="Пол"
        text={gender}
        onClick={() => handleOpen("gender")}
      />
      <ItemEdit title="Возраст" text={age} onClick={() => handleOpen("age")} />
      {errors && <p className="text-[25px] text-red-600">{errors.age?.message}</p>}

      <AnimatePresence>
        {isEditOpen && currentField && (
          <EditModal
            title={FieldMeta[currentField].title}
            onSave={handleSave}
            onClose={() => {
              dispatch(closeEditModal())
              setCurrentField(null)
            }}
          >
            {FieldMeta[currentField].render({
              control: form.control,
              name: currentField,
            })}
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}

type RenderProps = {
  control: Control<EditFormSchema>
  name: EditFormFields
}

export const FieldMeta: Record<
  EditFormFields,
  { title: string; render: (props: RenderProps) => JSX.Element }
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
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <AgeEdit {...field} />}
      />
    ),
  },
}

const GenderEdit = ({
  value,
  onChange,
}: {
  value: string | number | string[]
  onChange: (v: string) => void
}) => {
  return (
    <div className="flex justify-between">
      <Button
        className="w-[120px] h-[45px] text-[19px] duration-200"
        onClick={() => onChange("Мужской")}
        variant={value === "Мужской" ? "red" : "green"}
      >
        Мужской
      </Button>
      <Button
        className="w-[120px] h-[45px] text-[19px] duration-200"
        onClick={() => onChange("Женский")}
        variant={value === "Женский" ? "red" : "green"}
      >
        Женский
      </Button>
    </div>
  )
}

const NameEdit = ({ ...field }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Введите имя"
        className="w-full h-[50px] border rounded-[5px] px-4 text-[20px] font-ManropeM "
        {...field}
      />
    </div>
  )
}

const AgeEdit = ({ ...field }) => {
  return (
    <div>
      <input
        type="number"
        min={16}
        placeholder="Введите ваш возраст (от 16)"
        className="w-full h-[50px] border rounded-[5px] px-4 text-[20px] font-ManropeM "
        value={field.value}
        onChange={(e) => field.onChange(e.target.valueAsNumber)}
      />
    </div>
  )
}
