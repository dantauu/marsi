import { useNavigate } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import type { User } from "@/app/types/user"

type LikeCountProps = {
  isPending: boolean
  myLikes: User[] | undefined
}

export const LikeCount = ({ isPending, myLikes }: LikeCountProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-2 px-2 w-full h-[105px] shadow-easy rounded-[10px] bg-gradient-purple">
      <div
        onClick={() => navigate({ to: "/likes/my-likes" })}
        className="flex items-center flex-col gap-1 h-[34px]"
      >
        <p
          className={`font-ManropeM leading-4 text-white ${isPending ? "text-[16px]" : "text-[17px]"}`}
        >
          Лайки от меня:
        </p>
        <>
          {isPending ? (
            <LoadingBalls className="w-10" />
          ) : (
            <p className="font-HelveticaB text-[21px] text-white leading-5">
              {myLikes?.length || 0}
            </p>
          )}
        </>
      </div>
    </div>
  )
}
