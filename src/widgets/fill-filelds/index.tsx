import Button from "@/shared/ui/buttons/button.tsx"
import SvgGradientBrown from "@/assets/icons/GradientBrown.tsx"
import SvgGradientPurple from "@/assets/icons/GradientPurple.tsx"
import { useNavigate } from "@tanstack/react-router"
import { GetFields } from "@/lib/utils/get-fields"
import CrossOrigin from "@/assets/icons/CrossOrigin.tsx"

export const RequiredBlock = () => {
  const navigate = useNavigate()
  const { emptyFields } = GetFields()
  return (
    <div className="px-2 flex flex-col justify-between">
      <SvgGradientBrown className="fixed top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="mt-24 flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-center bg-[var(--color-bg-surface)] rounded-[15px] h-[40px]">
          <p className="text-[15px] font-ManropeM leading-6 text-center text-[var(--color-text-black)]">
            Последний шаг — и знакомства начнутся!
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-center w-full h-full shadow-easy bg-[var(--color-bg-surface)] rounded-[15px] px-3 py-4">
          <div className="flex flex-col gap-3">
            <p className="leading-5 text-[15px] text-center font-ManropeM text-[var(--color-text-black)]">
              Осталось заполнить необходимы поля:
            </p>
            <div className="flex flex-col justify-center flex-wrap gap-3 px-5">
              {emptyFields.map((field) => (
                <div className="flex items-center justify-between shadow-easy p-1 rounded-[7px]">
                  <p
                    key={field}
                    className="text-[17px] leading-4 text-[#b42525]"
                  >
                    {field}
                  </p>
                  <CrossOrigin className="w-5 h-5 text-[#b42525]" />
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={() => navigate({ to: "/profile-edit" })}
            className="h-[35px] text-[16px]"
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
