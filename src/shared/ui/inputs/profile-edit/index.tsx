import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"

export const InputEdit = ({
  value,
  onChange,
  placeholder,
  showErrors,
}: {
  value: string | string[] | undefined
  onChange: (v: string) => void
  placeholder: string
  showErrors: boolean
}) => {
  const {
    formState: { errors },
  } = useEditProfileForm()
  return (
    <div>
      <input
        type="number"
        inputMode="numeric"
        min={16}
        placeholder={placeholder}
        className="w-full h-[50px] border rounded-[5px] px-4 text-[20px] font-ManropeM"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {showErrors && errors.age && (
        <p className="text-[20px] text-red-600">{errors.age?.message}</p>
      )}
    </div>
  )
}
