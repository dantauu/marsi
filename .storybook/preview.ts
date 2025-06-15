import type { Preview } from "@storybook/react"
import "../src/app/fonts/Helvetica-Bold.woff"
import "../src/app/styles/index.css"

const preview: Preview = {
  parameters: {
    darkMode: {
      darkClass: "dark",
      stylePreview: true,
    },
  },
}

export default preview
