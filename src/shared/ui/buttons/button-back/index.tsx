import { useNavigate } from "@tanstack/react-router"
import Button from "@/shared/ui/buttons/button.tsx"
import { cn } from "@/lib/utils/cn.tsx"
import SvgBack from "@/assets/icons/Back.tsx"

type ButtonBackProps = {
  className?: string
  path?: string
  onClick?: () => void
}

export const ButtonBack = ({ path, className, onClick }: ButtonBackProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    onClick?.()
    navigate({ to: path })
  }

  return (
    <Button
      className={cn(
        "w-[50px] h-[38px] rounded-[7px] mx-2 mb-7 shadow-hard text-[17px] text-[#000] font-ManropeM",
        className
      )}
      onClick={handleClick}
      variant="default"
      type="button"
    >
      <SvgBack className="w-[30px] h-[30px] text-[#545454]" />
    </Button>
  )
}
