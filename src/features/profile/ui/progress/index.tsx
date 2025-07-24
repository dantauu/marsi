import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useAllPercentCount } from "@/lib/utils/get-percent-count"

export const Progress = () => {
  const { colors, percent } = useAllPercentCount()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-between py-1.5 mini-mobile:h-[105px] h-[85px] bg-main-green w-full mini-mobile:w-[180px] rounded-[10px] cursor-pointer">
      <div className="flex flex-row justify-center items-center w-full mini-mobile:flex-col">
        <p className="text-center text-white font-HelveticaB text-[16px]">
          Прогресс
        </p>
        <p className="text-center text-white font-HelveticaB text-[16px] pl-2">
          заполнения: <span style={{ color: colors }}>{percent}%</span>
        </p>
      </div>
      <Button
        className="w-[125px] h-[35px] bg-white rounded-[8px] font-HelveticaB"
        variant="default"
        onClick={() => navigate({ to: "/profile-edit" })}
      >
        Продолжить
      </Button>
    </div>
  )
}
