// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from "@storybook/react"
import Button from "./button.tsx"
import SvgDollar from "@/assets/icons/Dollar.tsx"

const meta = {
  title: "ui/Button",
  component: Button, // 🔑 Ключевое изменение - регистрируем компонент
  parameters: {},
  argTypes: {
    variant: {
      control: { type: "select" }, // Тип контрола для variant
      options: ["green", "red", "pink", "default"], // Доступные варианты
    },
    children: {
      control: { type: "text" }, // Контрол для текста кнопки
    },
    className: {
      control: { type: "text" }, // Контрол для дополнительных классов
    }
  },
} satisfies Meta<typeof Button> // Указываем тип компонента

export default meta

// Базовый шаблон для кнопки
const Template: StoryObj<typeof Button> = {
  render: (args) => <Button {...args} />,
}

// История для primary кнопок
export const Primary: StoryObj<typeof Button> = {
  ...Template,
  args: {
    variant: "green",
    children: "Написать",
    className: "w-[80px] h-[28px] font-HelveticaB"
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Story />
          <Story />
          <Story />
          <Story />
        </div>
      </div>
    )
  ]
}

// История для кнопок с иконкой
export const WithIcon: StoryObj<typeof Button> = {
  ...Template,
  args: {
    variant: "red",
    children: (
      <>
        <SvgDollar />
        Распродажи
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 bg-grey-1 p-2">
          <Story />
          <Story />
        </div>
      </div>
    )
  ]
}

// 🔥 Новая история для одиночной кнопки с Controls
export const Playground: StoryObj<typeof Button> = {
  render: (args) => <Button {...args} />,
  args: {
    variant: "green",
    children: "Нажми меня",
  },
}