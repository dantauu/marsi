import Button from "@/shared/ui/buttons/button.tsx"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"
import { cn } from "@/lib/utils/cn.tsx"

export const SaveNavBar = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const { reset } = form
  const resetFilter = () => {
    reset()
  }
  return (
    <div
      className={cn(
        "fixed w-full top-0 z-5 bg-[#fff7] shadow-shadow-block rounded-bl-[28px] rounded-br-[28px]",
        className
      )}
    >
      <div className="flex justify-between py-5 px-5">
        <Button
          className="w-[140px] h-[50px]"
          variant="red"
          type="button"
          onClick={resetFilter}
        >
          Сбросить
        </Button>
        <Button className="w-[140px] h-[50px]" type="submit" variant="green">
          Сохранить
        </Button>
      </div>
    </div>
  )
}
