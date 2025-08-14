import SvgPlus from "@/assets/icons/Plus.tsx"
import type { questionDataTypes } from "@/lib/data/question.ts"
import Button from "@/shared/ui/buttons/button.tsx"

type QuestionBlockProps = {
  data: questionDataTypes[]
  onClick: (id: number) => void
  isResponse: number | undefined
}

export const QuestionBlock = ({ data, onClick, isResponse }: QuestionBlockProps) => {
  return (
    <div>
      {data.map((item) => (
        <div className="flex justify-between shadow-shadow-block">
          <p>{item.question}</p>
          <Button onClick={() => onClick(item.id)} variant={"default"}><SvgPlus /></Button>
          {isResponse === item.id && <p>{item.response}</p>}
        </div>
      ))}
    </div>
  )
}