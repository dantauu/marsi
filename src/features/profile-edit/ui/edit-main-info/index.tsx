import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { openEditModal, closeEditModal } from "@/redux/slices/modal-slice"
import { EditModal } from "@/widgets/modals/edit-modal"
import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils/cn.tsx"
import { AnimatePresence } from "framer-motion"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context"
import type { EditFormFields } from "@/app/types/global"
import { useWatch } from "react-hook-form"
import { FieldMeta } from "./edit-metadata.tsx"
import { AddHobbies } from "@/features/profile-edit"
import { getGenderFormat } from "@/lib/utils/format-gender.ts"

export const EditMainInfo = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const {
    control,
    formState: { errors },
    setValue,
  } = form
  const dispatch = useAppDispatch()
  const { isEditOpen } = useAppSelector((state) => state.modal)

  const [currentField, setCurrentField] = useState<
    keyof typeof FieldMeta | null
  >(null)
  const [showErrors, setShowErrors] = useState(false)

  const handleOpen = (key: EditFormFields) => {
    dispatch(openEditModal())
    setCurrentField(key)
  }

  const handleSave = () => {
    setShowErrors(true)
    form.trigger(currentField!).then((isValid) => {
      if (isValid) {
        dispatch(closeEditModal())
        setCurrentField(null)
        setShowErrors(false)
      }
    })
  }

  const first_name = useWatch({ control, name: "first_name" })
  const gender = useWatch({ control, name: "gender" })
  const age = useWatch({ control, name: "age" })
  const city = useWatch({ control, name: "city" })
  const goal = useWatch({ control, name: "goal" })
  const height = useWatch({ control, name: "height" })
  const hobbies = useWatch({ control, name: "hobbies" })

  console.log("ERRORS", errors)
  return (
    <div
      className={cn(
        "rounded-[18px] shadow-shadow-block",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-2">
      <p className="font-HelveticaB text-[21px]">Основное</p>
      <ItemEdit
        title="Имя"
        text={first_name}
        onClick={() => handleOpen("first_name")}
      />
      <ItemEdit
        title="Пол"
        text={getGenderFormat(gender)}
        onClick={() => handleOpen("gender")}
      />
      <ItemEdit title="Возраст" text={age} onClick={() => handleOpen("age")} />
      <ItemEdit title="Город" text={city} onClick={() => handleOpen("city")} />
      <ItemEdit title="Цель" text={goal} onClick={() => handleOpen("goal")} />
      <ItemEdit
        title="Ваш рост"
        text={height}
        onClick={() => handleOpen("height")}
      />
      <AddHobbies
        onClick={() => handleOpen("hobbies")}
        onRemove={(hobby) => {
          const newHobby = hobbies.filter((h) => h !== hobby)
          setValue("hobbies", newHobby)
        }}
        text={hobbies}
        className="mt-5"
      />
      </div>

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
              showErrors,
            })}
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}
