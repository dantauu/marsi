import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { describe, it, vi } from "vitest"
import { render } from "@testing-library/react"
import { TechnicalWork } from "@/widgets/technical-work"
import { routeTree } from "@/routeTree.gen.ts"
import { Provider } from "react-redux"
import { store } from "@/redux/store.ts"
import "@testing-library/jest-dom"

type renderWithRouteProps = {
  testRoute: string
  findId: string
  nameRoute: string
}

vi.mock("heic2any", () => ({
  default: vi.fn(() => Promise.resolve(new Blob())),
}))

const createTestRouter = (initial: string = "/") => {
  return createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initial],
    }),
    defaultNotFoundComponent: TechnicalWork,
  })
}

const renderWithProvider = (ui: React.ReactNode) => {
  render(<Provider store={store}>{ui}</Provider>)
}

const testRenderWithRoute = ({
  testRoute,
  nameRoute,
}: renderWithRouteProps) => {
  it(nameRoute, async () => {
    const router = createTestRouter(testRoute)
    renderWithProvider(<RouterProvider router={router} />)

    // const element = await screen.findByTestId(findId)
    // expect(element).toBeInTheDocument()
  })
}

describe("TanStack Router", () => {
  testRenderWithRoute({
    testRoute: "/profile",
    findId: "profile",
    nameRoute: "Render profile",
  })
  testRenderWithRoute({
    testRoute: "/profile-edit",
    findId: "profile-edit",
    nameRoute: "Render profile edit",
  })
  testRenderWithRoute({
    testRoute: "/search",
    findId: "search",
    nameRoute: "Render search",
  })
  testRenderWithRoute({
    testRoute: "/slides",
    findId: "swipe-photo",
    nameRoute: "Render swipe-photo",
  })
  testRenderWithRoute({
    testRoute: "/more",
    findId: "more",
    nameRoute: "Render more",
  })
  testRenderWithRoute({
    testRoute: "/subscribe",
    findId: "subscribe",
    nameRoute: "Render subscribe",
  })
})
