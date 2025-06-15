import { createFileRoute } from "@tanstack/react-router"
import Profile from "@/pages/profile"

export const Route = createFileRoute("/_app/_layout/profile/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
