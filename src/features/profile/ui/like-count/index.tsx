import SvgArrow from "@/assets/icons/Arrow"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import type { User } from "@/app/types/global"

type LikeCountProps = {
  isPending: boolean
  likesToMe: User[] | undefined
  myLikes: User[] | undefined
}

export const LikeCount = ({
  isPending,
  likesToMe,
  myLikes,
}: LikeCountProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-between py-1 w-full mini-mobile:w-[210px] h-[115px] mini-mobile:h-[115px] shadow-shadow-block rounded-[10px]">
      <div className="">
        <div className="flex items-center gap-1">
          <div className="">
            <p className="font-ManropeM text-[16px]">Получено лайков:</p>
          </div>
          <div className="">
            {isPending ? (
              <LoadingBalls className="w-10" />
            ) : (
              <p className="font-HelveticaB text-[16px]">
                {myLikes?.length || 0}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 -mt-2.5">
          <div className="">
            <p className="font-ManropeM text-[16px]">Лайки от меня:</p>
          </div>
          <div className="">
            {isPending ? (
              <LoadingBalls className="w-10" />
            ) : (
              <p className="font-HelveticaB text-[16px]">
                {likesToMe?.length || 0}
              </p>
            )}
          </div>
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
