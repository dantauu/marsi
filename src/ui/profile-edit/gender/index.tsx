import Button from "@/shared/ui/buttons/button.tsx"

export const GenderEdit = ({
  value,
  onChange,
}: {
  value: string | number | string[]
  onChange: (v: string) => void
}) => {
  return (
    <div className="flex justify-between">
      <Button
        className="w-[130px] h-[45px] text-[19px] duration-200"
        onClick={() => onChange("Мужской")}
        variant={value === "Мужской" ? "red" : "green"}
        type="button"
      >
        Мужской
      </Button>
      <Button
        className="w-[130px] h-[45px] text-[19px] duration-200"
        onClick={() => onChange("Женский")}
        variant={value === "Женский" ? "red" : "green"}
        type="button"
      >
        Женский
      </Button>
    </div>
  )
}
