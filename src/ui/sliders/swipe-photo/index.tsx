import { useRef } from "react"
import type { UserPhotos } from "@/app/types/user"

type Props = { photo_url: UserPhotos | undefined }

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
          src={photo_url?.items[0].large}
          alt=""
          className="w-full h-full object-cover rounded-[20px] select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}
