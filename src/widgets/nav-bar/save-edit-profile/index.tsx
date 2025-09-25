import Button from "@/shared/ui/buttons/button.tsx"
import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
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
        "w-full z-5 bg-[#fff7] shadow-shadow-block rounded-[28px]",
        className
      )}
    >
      <div className="flex justify-between py-5 px-5">
        <Button
          className="w-[120px] h-[47px] mini-mobile:w-[140px] mini-mobile:h-[50px] mini-mobile:text-[16px] text-[15px]"
          variant="red"
          type="button"
          onClick={resetFilter}
        >
          Сбросить
        </Button>
        <Button
          className="w-[120px] h-[47px] mini-mobile:w-[140px] mini-mobile:h-[50px] mini-mobile:text-[16px] text-[15px]"
          type="submit"
          variant="green"
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}
