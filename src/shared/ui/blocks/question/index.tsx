import SvgPlus from "@/assets/icons/Plus.tsx"
import type { questionDataTypes } from "@/lib/data/question.tsx"
import { AnimatePresence, motion } from "framer-motion"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"
import { memo } from "react"
import Button from "@/shared/ui/buttons/button.tsx"

type QuestionBlockProps = {
  data: questionDataTypes[]
  onClick: (id: number) => void
  isResponse?: number | null
}

const QuestionItem = memo(
  ({
    item,
    isActive,
    onClick,
  }: {
    item: questionDataTypes
    isActive: boolean
    onClick: (id: number) => void
  }) => {
    return (
      <div className="flex flex-col items-center px-2 shadow-easy rounded-xl">
        <Button
          onClick={() => onClick(item.id)}
          className="flex items-center w-full justify-between h-15 cursor-pointer"
          variant="default"
        >
          <div className="font-ManropeM text-[16.5px]">{item.question}</div>
          <SvgPlus
            className={`min-w-7 h-7 stroke-[3.5] duration-150 ${isActive && "rotate-45"}`}
          />
        </Button>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden w-full"
            >
              <div className="w-full text-[#0000009e]">{item.response}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
  (prev, next) => prev.isActive === next.isActive && prev.item === next.item
)

export const QuestionBlock = memo(({
  data,
  onClick,
  isResponse,
}: QuestionBlockProps) => {
  const { isMobile } = usePlatform()
  return (
    <div
      className={`flex flex-col gap-7 px-2 ${isMobile ? "pt-[100px]" : "pt-[90px]"}`}
    >
      {data.map((item) => (
        <QuestionItem
          key={item.id}
          item={item}
          onClick={onClick}
          isActive={isResponse === item.id}
        />
      ))}
    </div>
  )
}
)
