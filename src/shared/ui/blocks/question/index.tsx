import SvgPlus from "@/assets/icons/Plus.tsx"
import type { questionDataTypes } from "@/lib/data/question.tsx"
import { AnimatePresence, motion } from "framer-motion"

type QuestionBlockProps = {
  data: questionDataTypes[]
  onClick: (id: number) => void
  isResponse?: number | null
}

export const QuestionBlock = ({
  data,
  onClick,
  isResponse,
}: QuestionBlockProps) => {
  return (
    <div className="flex flex-col gap-7">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center px-2 shadow-shadow-block rounded-xl"
        >
          <div onClick={() => onClick(item.id)} className="flex items-center w-full justify-between h-15">
            <p className="font-ManropeM text-[16.5px]">{item.question}</p>
              <SvgPlus className="min-w-7 h-7 stroke-[3.5]" />
          </div>
          <AnimatePresence>
            {isResponse === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden w-full"
              >
                <p className="w-full text-[#0000009e]">{item.response}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
