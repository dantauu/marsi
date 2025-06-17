// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react"
import Button from "./button.tsx"
import SvgEdit from "@/assets/icons/Edit.tsx"

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {},
  argTypes: {
    children: {
      control: false
    }
  }
} satisfies Meta

export default meta

export const primary: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1" variant="green">Написать</Button>
      </div>
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1" variant="red">Написать</Button>
      </div>
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1 text-white rounded-[7px]" variant="pink">Написать</Button>
      </div>
    </div>
  ),
}

export const withIcon: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1" variant="green">Написать<SvgEdit /></Button>
      </div>
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1" variant="red">Написать<SvgEdit /></Button>
      </div>
      <div className="flex flex-row gap-4">
        <Button className="px-2 py-1 text-white rounded-[7px]" variant="pink">Написать<SvgEdit /></Button>
      </div>
    </div>
  ),
}