import type { Meta, StoryObj } from "@storybook/react-vite"
import CardGrid from "@/widgets/card/card-grid.tsx"
import { CardGridLayout } from "@/entities/search/index.ts"
import avatar from "@/assets/images/girl-three.png"

const meta = {
  title: "ui/CardGridLayout",
  component: CardGrid,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta

export default meta

export const Card_Human: StoryObj = {
  render: () => {
    return <CardGridLayout id={"1"} first_name={"Катя"} age={"18"} photo_url={[avatar]} />
  },
}
