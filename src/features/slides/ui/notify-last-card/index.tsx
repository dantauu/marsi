import { MockCardData } from "@/lib/data/cards"
import { useAppSelector } from "@/redux/hooks"

const NotifyLastCard = () => {
  const { currentIndex } = useAppSelector((state) => state.slider)
  const isEndCard = currentIndex >= MockCardData.length - 1
  return (
    <>
      {isEndCard && (
        <>
          <div className="flex items-center justify-center text-[#000] bg-[#e4e4e4] rounded-[20px] h-[70px] w-full">
            <p className="font-ManropeM text-[18px]">
              Упс.. Вы всё пролистали 🥲
            </p>
          </div>
        </>
      )}
    </>
  )
}

export default NotifyLastCard
