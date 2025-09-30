import SvgArrow from "@/assets/icons/Arrow"
import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading"
import type { User } from "@/app/types/user"

type LikeCountProps = {
  isPending: boolean
  myLikes: User[] | undefined
}

export const LikeCount = ({ isPending, myLikes }: LikeCountProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-between py-2 px-2 w-full h-[105px] shadow-easy rounded-[10px]">
      <div className="flex items-center gap-1 -mt-2.5 h-[34px]">
        <p
          className={`font-ManropeM leading-4 ${isPending ? "text-[15px]" : "text-[16px]"}`}
        >
          Лайки от меня:
        </p>
        <>
          {isPending ? (
            <LoadingBalls className="w-10" />
          ) : (
            <p className="font-HelveticaB text-[16px]">
              {myLikes?.length || 0}
            </p>
          )}
        </>
      </div>
      <div className="w-full">
        <Button
          onClick={() => navigate({ to: "/likes/my-likes" })}
          className="w-full h-[35px] font-HelveticaB"
          variant="green"
        >
          Смотреть <SvgArrow className="mt-0.5 stroke-[1.8]" />
        </Button>
      </div>
    </div>
  )
}
