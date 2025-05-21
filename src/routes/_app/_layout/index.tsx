import { createFileRoute } from "@tanstack/react-router"
import Profile from "../../../pages/profile"

export const Route = createFileRoute("/_app/_layout/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
