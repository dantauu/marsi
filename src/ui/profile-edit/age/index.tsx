import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"

export const AgeEdit = ({
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
