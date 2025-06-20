import { createRootRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  loader: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ to: "/profile" })
    }
    return null
  },
})
