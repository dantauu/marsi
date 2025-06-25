import { LikeCard } from "@/shared/ui/like-card"

export const CardUnsubscribe = () => {
  const isSubscribe = 10 % 2 !== 1
  return <LikeCard isLocked={isSubscribe} />
}
