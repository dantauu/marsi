import SvgEdit from "@/assets/icons/Edit.tsx"

const ItemEdit = ({
  title,
  text,
  onClick,
}: {
  title?: string
  text?: string | string[] | number
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center h-[58px] px-2 rounded-[10px] bg-white border-2 border-[#0004]"
    >
      <div className="flex items-center gap-2">
        <div>
          <p className="font-ManropeM text-[17.2px] mini-mobile:text-[20px]">{title}:</p>
        </div>
        <div className="">
          <p className="w-full text-black font-ManropeM text-[17.2px] mini-mobile:text-[20px]">
            {text}
          </p>
        </div>
      </div>
      <SvgEdit className="text-white" />
    </div>
  )
}

export default ItemEdit
