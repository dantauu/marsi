type AboutMeProps = {
  value: string | string[] | number | undefined | null
  onChange: (v: string) => void
}

export const AboutMe = ({ value, onChange }: AboutMeProps) => {
  const controlValue = typeof value === "string" ? value : ""
  const maxValue = 120
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (newValue.length <= maxValue) {
      onChange(newValue)
    } else {
      onChange(newValue.slice(0, 10))
    }
  }
  return (
    <div className="flex flex-col gap-2 font-ManropeM">
      <p className="text-center font-HelveticaB text-[18px] text-[var(--color-text-black)]">
        {controlValue.length}/{maxValue}
      </p>
      <textarea
        onChange={handleChange}
        value={value ?? undefined}
        maxLength={maxValue}
        rows={3}
        className="border p-2 rounded-xl w-full min-h-[80px] font-ManropeM text-[var(--color-text-black)] focus:border-[var(--color-text-black)] active:border-[var(--color-text-black)]"
        placeholder="Расскожите о себе"
      />
    </div>
  )
}
