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
      <p className="text-center">
        {controlValue.length}/{maxValue}
      </p>
      <textarea
        onChange={handleChange}
        value={value ?? undefined}
        maxLength={maxValue}
        rows={3}
        className="border p-2 rounded-xl w-full font-ManropeM focus:border-black active:border-black"
        placeholder="Расскожите о себе"
      />
    </div>
  )
}
