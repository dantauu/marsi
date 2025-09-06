import { QuestionBlock } from "@/shared/ui/blocks/question"
import questionData from "@/lib/data/question.tsx"
import { useState } from "react"

const More = () => {
  const [response, setResponse] = useState<number | null>()
  const handleClick = (id: number) => {
    setResponse((prev) => (prev === id ? null : id))
  }
  return (
    <div className="px-2 mt-4" data-testid="more">
      <QuestionBlock
        isResponse={response}
        onClick={handleClick}
        data={questionData}
      />
    </div>
  )
}

export default More
