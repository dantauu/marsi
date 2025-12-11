import Button from "@/shared/ui/buttons/button.tsx"
import { useEditProfileForm } from "@/app/context/profile-edit-context.tsx"
import { cn } from "@/lib/utils/cn.tsx"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import LoadingCircle from "@/shared/ui/loading/circle.tsx"

export const SaveNavBar = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const { reset } = form
  const resetFilter = () => {
    reset()
  }
  const { isFetching } = useCurrentUser()
  return (
    <div
      className={cn(
        "w-full z-5 bg-[var(--color-bg-muted-nav)] shadow-hard rounded-[28px]",
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
          {isFetching ? <LoadingCircle /> : "Сохранить"}
        </Button>
      </div>
    </div>
  )
}
