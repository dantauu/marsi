import LoadingBalls from "@/shared/ui/loading"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import { useNavigate } from "@tanstack/react-router"
import type { User } from "@/app/types/user"

type LikeIncomingProps = {
  isPending: boolean
  likesToMe: User[] | undefined
}

export const LikeIncoming = ({ isPending, likesToMe }: LikeIncomingProps) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate({ to: "/likes/incoming-likes" })}
      className="flex justify-between items-center h-[90px] rounded-[10px] px-3 bg-gradient-purple"
    >
      <div className="flex items-center gap-1">
        <p
          className={`font-HelveticaB text-white ${isPending ? "text-[16px]" : "text-[17px]"}`}
        >
          Получено лайков:
        </p>
        <div className="">
          {isPending ? (
            <LoadingBalls className="w-10" />
          ) : (
            <p className="font-HelveticaB text-[16px] text-white">
              {likesToMe?.length || 0}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full">
        <SvgArrow className="w-[27px] h-[27px] -rotate-40 ml-1 text-[#FF9068]" />
      </div>
    </div>
  )
}
