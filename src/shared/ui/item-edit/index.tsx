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
      className="flex justify-between items-center h-[64px] px-2 rounded-[10px] bg-bg-input"
    >
      <div className="flex items-center gap-2">
        <div>
          <p className="font-ManropeM text-[20px] text-white">{title}:</p>
        </div>
        <div className="">
          <p className="w-full h-[30px] text-white font-ManropeM text-[20px]">
            {text}
          </p>
        </div>
      </div>
      <SvgEdit className="text-white" />
    </div>
  )
}

export default ItemEdit
