import { type JSX, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { openEditModal, closeEditModal } from "@/redux/slices/modal-slice"
import { EditModal } from "@/widgets/modals/edit-modal"
import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context"
import type { EditFormFields } from "@/app/types/global"
import { type Control, Controller } from "react-hook-form"
import type { EditFormSchema } from "@/app/providers/profile-edit-form"

export const EditMainInfo = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const dispatch = useAppDispatch()
  const { isEditOpen } = useAppSelector((state) => state.modal)

  const [currentField, setCurrentField] = useState<
    keyof typeof fieldMeta | null
  >(null)

  const handleOpen = (key: EditFormFields) => {
    dispatch(openEditModal())
    setCurrentField(key)
  }

  const handleSave = () => {
    dispatch(closeEditModal())
    setCurrentField(null)
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ItemEdit
        title="Имя"
        text={form.watch("first_name")}
        onClick={() => handleOpen("first_name")}
      />
      <ItemEdit
        title="Пол"
        text={form.watch("gender")}
        onClick={() => handleOpen("gender")}
      />

      <AnimatePresence>
        {isEditOpen && currentField && (
          <EditModal
            title={fieldMeta[currentField].title}
            onSave={handleSave}
            onClose={() => {
              dispatch(closeEditModal())
              setCurrentField(null)
            }}
          >
            {fieldMeta[currentField].render({
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

export const fieldMeta: Record<
  EditFormFields,
  { title: string; render: (props: RenderProps) => JSX.Element }
> = {
  first_name: {
    title: "Имя",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input className="w-full p-2 text-black" {...field} />
        )}
      />
    ),
  },
  gender: {
    title: "Пол",
    render: ({ control, name }) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select className="w-full p-2 text-black" {...field}>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
          </select>
        )}
      />
    ),
  },
}
