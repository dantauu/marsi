import SvgEdit from "@/assets/icons/Edit.tsx"

const InputWithIcon = ({
  title,
  placeholder,
}: {
  title?: string
  placeholder?: string
}) => {
  return (
    <div className="flex justify-between items-center h-[64px] px-2 rounded-[10px] bg-bg-input">
      <div className="flex items-center gap-2">
        <div>
          <p className="font-ManropeM text-[20px] text-white">
            {title}
            {title && ":"}
          </p>
        </div>
        <div>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-[35px] text-white font-ManropeM text-[20px]"
          />
        </div>
      </div>
      <SvgEdit className="text-white" />
    </div>
  )
}

export default InputWithIcon
