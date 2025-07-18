import { useState, useRef } from "react"

type Props = { photo_url: string[] }

export const SwipePhotos: React.FC<Props> = ({ photo_url }) => {
  const [index, setIndex] = useState(0)
  const count = photo_url.length

  const isDragging = useRef(false)
  const startX = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = false
    startX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.abs(e.clientX - startX.current) > 5) {
      isDragging.current = true
    }
  }

  const handleClickLeft = () => {
    if (!isDragging.current) {
      setIndex((i) => Math.max(0, i - 1))
    }
  }

  const handleClickRight = () => {
    if (!isDragging.current) {
      setIndex((i) => Math.min(count - 1, i + 1))
    }
  }

  return (
    <div
      className="relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="relative h-[500px]">
        <img
          src={photo_url[index]}
          alt=""
          className="w-full h-full object-cover rounded-[28px] select-none"
          draggable={false}
        />
      </div>

      {/* Левая часть */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[50%] z-10"
        onClick={handleClickLeft}
      />
      {/* Правая часть */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[50%] z-10"
        onClick={handleClickRight}
      />

      {/* Индикаторы */}
      <div className="flex justify-center gap-3 absolute top-8 left-0 right-0">
        {photo_url.map((_, i) => (
          <div
            key={i}
            className={`w-[40px] h-[6px] border-white border-1 rounded-2xl duration-200 ${
              i === index ? "bg-white" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
