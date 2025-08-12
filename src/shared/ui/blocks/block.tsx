import { cn } from "@/lib/utils/cn.tsx"

const Block = ({
  text,
  className,
  onClick,
}: {
  text: string | React.ReactNode
  onClick?: () => void
  className?: string
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "flex items-center h-[43px] px-1.5 shadow-shadow-block rounded-[10px]"
      )}
    >
      <p className="font-ManropeM">{text}</p>
    </div>
  )
}

export default Block
