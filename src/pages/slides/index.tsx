import { MockCardData } from "@/lib/data/cards"
import { useState } from "react"

type CardData = {
  id: number
  name: string
  age: number
  avatar: string
}

const Slides = () => {
  const [lastDirection, setLastDirection] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  const getClientXY = (
    e: React.TouchEvent | React.MouseEvent
  ): { x: number; y: number } => {
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    } else {
      return {
        x: e.clientX,
        y: e.clientY,
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
    const { x, y } = getClientXY(e)
    setStartPosition({ x, y })
  }

  const onSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const { x, y } = getClientXY(e)
    const dx = x - startPosition.x
    const dy = y - startPosition.y
    setPosition({ x: dx, y: dy })
  }

  const onSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = getEndClientX(e)
    const direction = clientX > startPosition.x ? "right" : "left"

    setLastDirection(direction)

    if (Math.abs(position.x) > 150) {
      setCurrentIndex((prev) => prev + 1)
    }

    setPosition({ x: 0, y: 0 })
    setIsDragging(false)
  }

  const getOpacity = (x: number) => {
    const absX = Math.min(Math.abs(x), 150)
    return absX / 150 // от 0 до 1
  }

  return (
    <div
      className="swipe-container relative w-full h-screen flex items-center justify-center overflow-hidden"
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
          className="relative w-72 h-96 rounded-xl shadow-xl flex items-end overflow-hidden transition-transform duration-100"
          style={{
            transform: `translateX(${position.x}px)`,
          }}
        >
          {/* Иконка ❌ */}
          <div
            className="absolute top-4 left-4 text-red-500 text-4xl transition-opacity duration-100 z-10"
            style={{ opacity: position.x < 0 ? getOpacity(position.x) : 0 }}
          >
            ❌
          </div>

          {/* Иконка ✅ */}
          <div
            className="absolute top-4 right-4 text-green-500 text-4xl transition-opacity duration-100 z-10"
            style={{ opacity: position.x > 0 ? getOpacity(position.x) : 0 }}
          >
            ✅
          </div>

          {/* Карточка */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${item.avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 w-full bg-black/50 text-white p-4">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>{item.age} лет</p>
          </div>
        </div>
      ))}

      <p className="absolute bottom-4 text-sm text-gray-600">
        Последний свайп: {lastDirection}
      </p>
    </div>
  )
}

export default Slides
