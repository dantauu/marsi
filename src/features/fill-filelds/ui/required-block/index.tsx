import Button from "@/shared/ui/buttons/button.tsx"
import SvgGradientBrown from "@/assets/icons/GradientBrown.tsx"
import SvgGradientPurple from "@/assets/icons/GradientPurple.tsx"
import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"

export const RequiredBlock = () => {
  const navigate = useNavigate()
  const { emptyFields } = GetFields()
  return (
    <div className="  px-2  flex flex-col justify-between">
      <SvgGradientBrown className="fixed top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="mt-24 flex flex-col gap-3 relative z-10">
        <p className="text-[21px] font-ManropeM leading-6 text-center">
          Всего один шаг — и знакомства начнутся!
        </p>
        <div className="flex flex-col gap-3 justify-center w-full h-[210px] shadow-easy bg-white rounded-[15px] px-1">
          <div className="flex flex-col gap-3">
            <p className="leading-5 text-[18px] text-center font-ManropeM">
              Осталось заполнить необходимы поля:
            </p>
            <div className="flex justify-center flex-wrap gap-1">
              {emptyFields.map((i) => (
                <p key={i} className="text-[18px] leading-4 text-red-600">
                  *{i}
                </p>
              ))}
            </div>
          </div>
          <Button
            onClick={() => navigate({ to: "/profile-edit" })}
            className="h-[50px] text-[18px]"
            variant={"green"}
          >
            Заполнить
          </Button>
        </div>
      </div>

      <SvgGradientPurple className="fixed bottom-30 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
    </div>
  )
}
