import { type JSX, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { openEditModal, closeEditModal } from "@/redux/slices/modal-slice"
import { EditModal } from "@/widgets/modals/edit-modal"
import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context"
import type { EditFormFields, Locations } from "@/app/types/global"
import { type Control, Controller, useWatch } from "react-hook-form"
import type { EditFormSchema } from "@/app/providers/profile-edit-form"
import Button from "@/shared/ui/buttons/button.tsx"
import { useGetLocationsQuery } from "@/redux/api/locations.ts"
import { useDebounce } from "@/lib/hooks/use-debounce.ts"

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
      {errors && (
        <p className="text-[25px] text-red-600">{errors.age?.message}</p>
      )}
      <ItemEdit title="Город" text={city} onClick={() => handleOpen("city")} />
      {errors && (
        <p className="text-[25px] text-red-600">{errors.city?.message}</p>
      )}

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
        type="button"
      >
        Мужской
      </Button>
      <Button
        className="w-[120px] h-[45px] text-[19px] duration-200"
        onClick={() => onChange("Женский")}
        variant={value === "Женский" ? "red" : "green"}
        type="button"
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

const AgeEdit = ({
  value,
  onChange,
  showErrors,
}: {
  value: string | number | string[]
  onChange: (v: number) => void
  showErrors: boolean
}) => {
  const {
    formState: { errors },
  } = useEditProfileForm()
  return (
    <div>
      <input
        type="number"
        min={16}
        placeholder="Введите ваш возраст (от 16)"
        className="w-full h-[50px] border rounded-[5px] px-4 text-[20px] font-ManropeM "
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
      {showErrors && errors.age && (
        <p className="text-[20px] text-red-600">{errors.age?.message}</p>
      )}
    </div>
  )
}

const CityEdit = ({
  value,
  onChange,
}: {
  value: string | number | string[]
  onChange: (v: string) => void
}) => {
  const [inputValue, setInputValue] = useState(
    typeof value === "string" ? value : ""
  )
  const debouncedSearch = useDebounce(inputValue, 700)
  const { data: locations, isLoading } = useGetLocationsQuery({
    search: debouncedSearch,
    limit: 10,
  })

  const handleSelect = (location: Locations) => {
    onChange(location.name)
    setInputValue(location.name)
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Выберите местоположение"
        value={inputValue}
        onChange={(e) => {
          const raw = e.target.value
          const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1)
          setInputValue(capitalized)
        }}
        className="border p-2 rounded-xl w-full"
      />

      {isLoading && <p>Загрузка...</p>}

      <div className="pt-7 flex flex-col gap-4">
        {locations?.length ? (
          <>
            {locations?.map((item) => (
              <p
                className="font-ManropeM"
                onClick={() => handleSelect(item)}
                key={item.id}
              >
                {item.name}, {item.region}
              </p>
            ))}
          </>
        ) : (
          <p className="text-2xl">Ничего не найдено</p>
        )}
      </div>
    </div>
  )
}
