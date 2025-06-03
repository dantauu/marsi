import { MockCardData } from "@/lib/data/cards"
import { useState } from "react"

// type CardData = {
//   id: number
//   name: string
//   age: number
//   avatar: string
// }

const Slides = () => {
  const [_lastDirection, setLastDirection] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [position, setPosition] = useState({ x: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState({ x: 0 })

  const getClientX = (
    e: React.TouchEvent | React.MouseEvent
  ): { x: number } => {
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX,
      }
    } else {
      return {
        x: e.clientX,
      }
    }
  }

  const getEndClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("changedTouches" in e) {
      return e.changedTouches[0].clientX
    } else {
      return e.clientX
    }
  }

  const onSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const { x } = getClientX(e)
    setStartPosition({ x })
  }

  const onSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    if ("touches" in e) {
      e.preventDefault()
    }
    const { x } = getClientX(e)
    const dx = x - startPosition.x
    setPosition({ x: dx })
  }

  const onSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = getEndClientX(e)
    const direction = clientX > startPosition.x ? "right" : "left"

    setLastDirection(direction)

    if (Math.abs(position.x) > 150) {
      setCurrentIndex((prev) => prev + 1)
    }

    setPosition({ x: 0 })
    setIsDragging(false)
  }

  const getOpacity = (x: number) => {
    const absX = Math.min(Math.abs(x), 150)
    return absX / 50
  }

  return (
    <div
      className="swipe-container relative w-full h-fit px-1 flex items-center justify-center overflow-hidden duration-300"
      onMouseDown={onSwipeStart}
      onTouchStart={onSwipeStart}
      onMouseMove={onSwipeMove}
      onTouchMove={onSwipeMove}
      onMouseUp={onSwipeEnd}
      onTouchEnd={onSwipeEnd}
      onMouseLeave={onSwipeEnd}
    >
      {MockCardData.slice(currentIndex, currentIndex + 1).map((item) => (
        <div
          key={item.id}
          className="relative w-full h-[550px] flex justify-center overflow-hidden transition-transform duration-100"
          style={{
            transform: `translateX(${position.x}px)`,
          }}
        >
          {/* Иконка ❌ */}
          <div
            className="absolute top-55 left-33 text-red-500 text-8xl transition-opacity duration-100 z-10"
            style={{ opacity: position.x < 0 ? getOpacity(position.x) : 0 }}
          >
            ❌
          </div>

          {/* Иконка ✅ */}
          <div
            className="absolute top-55 right-33 text-green-500 text-8xl transition-opacity duration-100 z-10"
            style={{ opacity: position.x > 0 ? getOpacity(position.x) : 0 }}
          >
            ✅
          </div>

          <div className="relative w-full h-[550px]">
            <div className="w-full h-full inset-0">
              <img
                className="w-full h-full object-cover object-center rounded-[28px]"
                src={item.avatar}
                alt=""
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-[40px] font-ManropeM">
                  {item.name}, {item.age}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Slides
