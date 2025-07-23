import SvgArrow from "@/assets/icons/Arrow"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useGetLikesToMeQuery } from "@/shared/api/user.ts"

export const LikeCount = () => {
  const navigate = useNavigate()
  const { data } = useGetLikesToMeQuery()
  return (
    <div className="flex flex-col items-center justify-between py-2 w-full mini-mobile:w-[210px] h-[85px] mini-mobile:h-[105px] shadow-shadow-block rounded-[10px]">
      <div className="flex items-center gap-1">
        <div className="">
          <p className="font-ManropeM text-[16px]">Получено лайков:</p>
        </div>
        <div className="">
          <p className="font-HelveticaB text-[16px]">
            {data?.length || 0}
          </p>
        </div>
      </div>
      <Button
        onClick={() => navigate({ to: "/likes" })}
        className="w-[125px] h-[35px] font-HelveticaB"
        variant="green"
      >
        Смотреть <SvgArrow />
      </Button>
    </div>
  )
}
