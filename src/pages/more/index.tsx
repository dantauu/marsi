import { QuestionBlock } from "@/shared/ui/blocks/question"
import questionData from "@/lib/data/question.tsx"
import { useState } from "react"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"

const More = () => {
  const [response, setResponse] = useState<number | null>()
  const handleClick = (id: number) => {
    setResponse((prev) => (prev === id ? null : id))
  }
  const { isMobile } = usePlatform()
  return (
    <div className="pb-[150px]" data-testid="more">
      <div
        className={`fixed flex justify-center top-0 items-center w-full max-w-[610px] shadow-easy bg-[var(--color-bg-surface)] ${isMobile ? "pt-[92px] h-[130px]" : "pt-0 h-[80px]"}`}
      >
        <p className="text-[18px] text-[var(--color-text-black)]">
          Частые вопросы
        </p>
      </div>
      <QuestionBlock
        isResponse={response}
        onClick={handleClick}
        data={questionData}
      />
    </div>
  )
}

export default More
