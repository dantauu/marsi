import { Progress } from "@/features/profile"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "ui/Progress",
  component: Progress,
} satisfies Meta

export default meta

export const Copy: StoryObj = {
  render: () => {
    return <Progress />
  },
}
