import InputWithIcon from "@/shared/ui/inputs.tsx"
import { cn } from "@/lib/utils.tsx"

export  const EditMainInfo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center gap-2 py-2 px-1 w-full shadow-shadow-block" +
      " rounded-[10px]", className)}>
      <InputWithIcon title="Имя" />
      <InputWithIcon title="Возраст" />
      <InputWithIcon title="Пол" />
      <InputWithIcon title="Город" />
      <InputWithIcon title="Цель" />
    </div>
  )
}
