import EditProfile from "@/pages/profile-edit"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/_layout/profile-edit/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditProfile />
}
