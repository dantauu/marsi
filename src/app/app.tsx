import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"
import { TelegramProvider } from "./providers/telegram"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { MantineProvider } from "@mantine/core"


const router = createRouter({ routeTree })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const App = () => {
  return (
    <TelegramProvider>
      <Provider store={store}>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </Provider>
    </TelegramProvider>
  )
}

export default App
