import SvgEdit from "@/assets/icons/Edit.tsx"
import { memo } from "react"

const ItemEdit = ({
  title,
  text,
  onClick,
}: {
  title?: string
  text?: string | string[] | number | null
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center h-[58px] px-2 rounded-[10px] bg-white border-2 border-[#0004] cursor-pointer"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <p className="font-ManropeM text-[17.2px] mini-mobile:text-[20px] shrink-0">
          {title}:
        </p>
        <p className="truncate text-black font-ManropeM text-[17.2px] mini-mobile:text-[20px] mini-mobile:max-w-[210px] max-w-[200px]">
          {text}
        </p>
      </div>
      <SvgEdit className="text-black shrink-0 w-[25px] h-[25px]" />
    </div>
  )
}

export default memo(ItemEdit)
