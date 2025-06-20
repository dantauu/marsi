import type { Meta, StoryObj } from "@storybook/react-vite"
import { FilterSlide } from "@/ui"
import { useState } from "react"

const meta = {
  title: "ui/FilterSlide",
  component: FilterSlide,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta

export default meta

export const FilterSlider: StoryObj = {
  render: () => {
    const [values, setValues] = useState<[number, number]>([16, 100])
    return (
      <FilterSlide
        title={"Возраст"}
        values={values}
        min={16}
        max={100}
        setValues={setValues}
      />
    )
  },
}
