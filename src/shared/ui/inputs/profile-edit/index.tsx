import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"

export const InputEdit = ({
  value,
  onChange,
  placeholder,
  showErrors,
}: {
  value: string | string[] | number | undefined | null
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
        className="w-full h-[50px] border border-[var(--color-text-black)] placeholder:text-[var(--color-text-black)] text-[var(--color-text-black)] rounded-[5px] px-4 text-[20px] font-ManropeM"
        value={value ?? undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {showErrors && errors.age && (
        <p className="text-[20px] text-red-600">{errors.age?.message}</p>
      )}
      {showErrors && errors.height && (
        <p className="text-[20px] text-red-600">{errors.height?.message}</p>
      )}
    </div>
  )
}
