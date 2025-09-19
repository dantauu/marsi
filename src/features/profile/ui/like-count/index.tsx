import SvgArrow from "@/assets/icons/Arrow"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import type { User } from "@/app/types/user"

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
    <div className="flex flex-col items-center justify-between py-1 px-2 w-full h-[115px] mini-mobile:h-[115px] shadow-shadow-block rounded-[10px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 h-[34px]">
          <p
            className={`font-ManropeM ${isPending ? "text-[14.2px]" : "text-[16px]"}`}
          >
            Получено лайков:
          </p>
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
        <div className="flex items-center gap-1 -mt-2.5 h-[34px]">
          <p
            className={`font-ManropeM ${isPending ? "text-[15px]" : "text-[16px]"}`}
          >
            Лайки от меня:
          </p>
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
      </div>
      <div className="w-full">
        <Button
          onClick={() => navigate({ to: "/likes" })}
          className="w-full h-[35px] font-HelveticaB"
          variant="green"
        >
          Смотреть <SvgArrow className="mt-0.5" />
        </Button>
      </div>
    </div>
  )
}
