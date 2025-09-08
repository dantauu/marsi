import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useAllPercentCount } from "@/lib/utils/get-percent-count"

export const Progress = () => {
  const { colors, percent } = useAllPercentCount()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-between py-1.5 px-2 mini-mobile:h-[115px] h-[85px] bg-main-green w-full mini-mobile:w-full rounded-[10px] cursor-pointer leading-5">
      <div className="flex flex-row justify-center items-center w-full mini-mobile:flex-col">
        <p className="text-center text-white font-HelveticaB text-[16px]">
          Общий прогресс
        </p>
        <p className="text-center text-white font-HelveticaB text-[16px] pl-2">
          заполнения: <span style={{ color: colors }}>{percent}%</span>
        </p>
      </div>
      <div className="w-full">
        <Button
          className="w-full h-[35px] bg-white rounded-[8px] font-HelveticaB"
          variant="default"
          onClick={() => navigate({ to: "/profile-edit" })}
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}
