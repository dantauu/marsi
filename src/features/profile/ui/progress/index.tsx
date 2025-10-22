import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"

export const Progress = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-between py-2 px-2 h-[105px] bg-main-green w-full mini-mobile:w-full rounded-[10px] cursor-pointer leading-5">
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-center text-white font-HelveticaB text-[16px] leading-4">
          Смотреть о приложении
        </p>
      </div>
      <div className="w-full">
        <Button
          className="w-full h-[35px] bg-white rounded-[8px] font-HelveticaB"
          variant="default"
          onClick={() => navigate({ to: "/more" })}
        >
          Перейти
        </Button>
      </div>
    </div>
  )
}
