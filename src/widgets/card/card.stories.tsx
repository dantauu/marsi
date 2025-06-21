import type { Meta, StoryObj } from "@storybook/react-vite"
import CardHuman from "@/widgets/card/ui.tsx"
import Card from "@/entities/search/ui/card"
import avatar from "@/assets/images/girl-three.png"

const meta = {
  title: "ui/Card",
  component: CardHuman,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta

export default meta

export const Card_Human: StoryObj = {
  render: () => {
    return (
      <Card name={"Катя"} age={18} avatar={avatar} />
    )
  },
}
