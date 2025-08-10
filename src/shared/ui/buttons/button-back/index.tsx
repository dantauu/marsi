import SvgArrow from "@/assets/icons/Arrow.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"

export const ButtonBack = () => {
  const navigate = useNavigate()
  return (
    <Button
      className="w-[115px] h-[40px] rounded-[7px] mx-2 mb-7 shadow-shadow-block text-[19px] text-[#000] font-ManropeM"
      onClick={() => navigate({ to: "/profile" })}
      variant="default"
    >
      <SvgArrow className="w-[20px] h-[20px] rotate-180 text-[#0007]" />{" "}
      Назад
    </Button>
  )
}