import { SeeAboutApp } from "@/features/profile"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "ui/SeeAboutApp",
  component: SeeAboutApp,
} satisfies Meta

export default meta

export const Copy: StoryObj = {
  render: () => {
    return <SeeAboutApp />
  },
}
