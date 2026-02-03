import { useNavigate } from "@tanstack/react-router"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import type { User } from "@/app/types/user.ts"

type LikeCountProps = {
  isPending: boolean
  myLikes: User[] | undefined
}

export const LikeCount = ({ isPending, myLikes }: LikeCountProps) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-2 px-2 w-full h-[105px] shadow-easy rounded-[10px] bg-[var(--color-bg-surface)]">
      <div
        onClick={() => navigate({ to: "/likes/my-likes" })}
        className="flex items-center flex-col gap-1 h-[34px]"
      >
        <p
          className={`font-HelveticaB leading-4 text-[var(--color-text-black)] ${isPending ? "text-[16px]" : "text-[17px]"}`}
        >
          Лайки от меня:
        </p>
        <>
          {isPending ? (
            <LoadingBalls className="w-10" />
          ) : (
            <p className="font-HelveticaB text-[17.5px] text-[var(--color-text-black)] leading-5">
              {myLikes?.length || 0}
            </p>
          )}
        </>
      </div>
    </div>
  )
}
