import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TechnicalWork } from "@/widgets/technical-work"
import { routeTree } from "@/routeTree.gen.ts"
import { Provider } from "react-redux"
import { store } from "@/redux/store.ts"
import "@testing-library/jest-dom"

type renderWithRouteProps = {
  testRoute: string
  findId: string
}

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

const testRenderWithRoute = ({ testRoute, findId }: renderWithRouteProps) => {
  it("renders the routes", async () => {
    const router = createTestRouter(testRoute)
    renderWithProvider(<RouterProvider router={router} />)

    const element = await screen.findByTestId(findId)
    expect(element).toBeInTheDocument()
  })
}

describe("TanStack Router", () => {
  testRenderWithRoute({ testRoute: "/profile", findId: "profile" })
  testRenderWithRoute({ testRoute: "/profile-edit", findId: "profile-edit" })
  testRenderWithRoute({ testRoute: "/search", findId: "search" })
  testRenderWithRoute({ testRoute: "/slides", findId: "slides" })
  testRenderWithRoute({ testRoute: "/more", findId: "more" })
})
