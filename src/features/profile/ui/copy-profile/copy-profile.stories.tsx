import { CopyProfile } from "@/features/profile"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "ui/CopyProfile",
  component: CopyProfile,
} satisfies Meta

export default meta

export const Copy: StoryObj = {
  render: () => {
    return <CopyProfile />
  },
}
