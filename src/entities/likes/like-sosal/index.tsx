import { LikeCard } from "@/entities/likes/like-card"

export const LikeSosal = () => {
  const isSubscribe = 10 % 2 !== 1
  console.log("isSubscribe", isSubscribe)
  return <LikeCard isLocked={isSubscribe} />
}
