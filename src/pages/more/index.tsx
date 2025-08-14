import { QuestionBlock } from "@/shared/ui/blocks/question"
import questionData from "@/lib/data/question.ts"
import { useState } from "react"

const More = () => {
  const [response, setResponse] = useState<number>()
  const handleClick = (id: number) => {
    setResponse((prev) => prev && id)
  }
  return (
    <div data-testid="more">
      <QuestionBlock isResponse={response} onClick={handleClick} data={questionData}/>
    </div>
  )
}

export default More
