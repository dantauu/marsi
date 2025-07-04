import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  openEditModal,
  closeEditModal,
  setEditFieldValue,
} from "@/redux/slices/modal-slice"
import { EditModal } from "@/widgets/modals/edit-modal"
import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"

export const EditMainInfo = ({ className }: { className?: string }) => {
  // 1. Локальный стейт для значений
  const [fields, setFields] = useState({
    name: "Артём",
    gender: "Мужской",
  })

  const { isEditOpen, editFieldTitle, editFieldValue, editFieldKey } =
    useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  // 2. Открытие модалки с текущим значением
  const handleOpen = (key: keyof typeof fields, title: string) => {
    dispatch(openEditModal({ key, title, value: fields[key] }))
  }

  // 3. Сохраняем новое значение в стейт
  const handleSave = (value: string | number) => {
    setFields((prev) => ({
      ...prev,
      [editFieldKey!]: value,
    }))
    dispatch(closeEditModal())
  }

  const handleChange = (value: string | number) => {
    dispatch(setEditFieldValue(value))
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <ItemEdit
        title="Имя"
        text={fields.name}
        onClick={() => handleOpen("name", "Имя")}
      />
      <ItemEdit
        title="Пол"
        text={fields.gender}
        onClick={() => handleOpen("gender", "Пол")}
      />

      <AnimatePresence>
        {isEditOpen && (
          <EditModal
            title={editFieldTitle!}
            value={editFieldValue!}
            onSave={handleSave}
            onClose={() => dispatch(closeEditModal())}
          >
            {
              {
                name: (
                  <EditName value={editFieldValue!} onChange={handleChange} />
                ),
                gender: (
                  <EditGender value={editFieldValue!} onChange={handleChange} />
                ),
              }[editFieldKey!]
            }
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}

export const EditName = ({
  value,
  onChange,
}: {
  value: string | number
  onChange: (v: string) => void
}) => {
  return (
    <input
      className="w-full p-2 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export const EditGender = ({
  value,
  onChange,
}: {
  value: string | number
  onChange: (v: string) => void
}) => {
  return (
    <select
      className="w-full p-2 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Мужской">Мужской</option>
      <option value="Женский">Женский</option>
    </select>
  )
}
