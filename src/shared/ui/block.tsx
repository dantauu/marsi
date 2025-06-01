import { cn } from "../../lib/utils"

const Block = ({
  text,
  className,
}: {
  text: string | React.ReactNode
  className?: string
}) => {
  return (
    <div
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
