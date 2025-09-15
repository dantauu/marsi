import { useRef } from "react"

type Props = { photo_url: string[] }

export const SwipePhotos: React.FC<Props> = ({ photo_url }) => {

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

  return (
    <div
      className="relative select-none z-5"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div className="h-[430px] mini-mobile:h-[490px]">
        <img
          src={Array.isArray(photo_url) ? photo_url[0] : photo_url}
          alt=""
          className="w-full h-full object-cover rounded-[20px] select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}
