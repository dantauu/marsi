import InputWithIcon from "@/shared/ui/inputs.tsx"

export const EditMainInfo = () => {
  return (
    <div className="flex flex-col gap-2">
      <InputWithIcon title="Имя" />
      <InputWithIcon title="Возраст" />
      <InputWithIcon title="Пол" />
      <InputWithIcon title="Город" />
      <InputWithIcon title="Цель" />
    </div>
  )
}
