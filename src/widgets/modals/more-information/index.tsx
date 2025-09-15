import { MainInfoUser } from "@/shared/ui/user/main-info"
import type { User } from "@/app/types/user"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { AnimatePresence, motion } from "framer-motion"
import { useTelegram } from "@/app/providers/telegram"

type SliderCardProps = {
  data: User[]
  currentUser?: User
  isMore: boolean
  setIsMore: (value: boolean) => void
}

export const MoreInformation = ({
  data,
  currentUser,
  isMore,
  setIsMore,
}: SliderCardProps) => {
  const { currentIndex } = SwiperCard({ data })
  const { webApp } = useTelegram()
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  return (
    <AnimatePresence>
      {isMore && (
        <motion.div
          className={`fixed inset-0 z-50 flex justify-center bg-white ${mobile.includes(platform) ? "pt-[80px]" : "pt-0"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="w-full max-w-[550px]"
          >
            <MainInfoUser
              setIsMore={setIsMore}
              user={currentUser ? currentUser : data[currentIndex]}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
