import Button from "@/shared/ui/buttons/button.tsx"
import { useEditProfileForm } from "@/app/providers/profile-edit-form/profile-edit-context.tsx"
import { cn } from "@/lib/utils.tsx"
import { useUpdateUserMutation } from "@/shared/api/user.ts"
import { useNotify } from "@/lib/hooks/use-notify.ts"

export const SaveNavBar = ({ className }: { className?: string }) => {
  const form = useEditProfileForm()
  const { reset } = form
  const resetFilter = () => {
    reset()
  }
  const [updateUser] = useUpdateUserMutation()
  const { notify } = useNotify()

  const toaster = () => {
    const userData = form.getValues()
    notify(updateUser(userData).unwrap(), {
      success: "Данные сохранены",
      error: "Ошибка",
      loading: "Сохранение...",
    })
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
        <Button
          onClick={toaster}
          className="w-[140px] h-[50px]"
          type="submit"
          variant="green"
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}
