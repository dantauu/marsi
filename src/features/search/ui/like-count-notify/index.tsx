import type { User } from "@/app/types/user"
import { memo } from "react"

const LikesCountComponent = ({
  countLikes,
}: {
  countLikes: User[] | undefined
}) => {
  const count = countLikes?.length ?? 0
  return (
    <div className="flex items-center justify-center mx-auto w-[200px] h-[25px] bg-main-pink rounded-[7px] mt-2 mb-2">
      <p className="font-ManropeM text-[14.5px] text-white">
        Получено лайков: {count}
      </p>
    </div>
  )
}

export const LikesCount = memo(LikesCountComponent)
