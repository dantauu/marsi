import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "../routeTree.gen"
import { TelegramProvider } from "./providers/telegram"
import { Provider } from "react-redux"
import { store } from "../redux/store"

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
        <RouterProvider router={router} />
      </Provider>
    </TelegramProvider>
  )
}

export default App
