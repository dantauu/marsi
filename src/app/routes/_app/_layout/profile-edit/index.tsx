import { createFileRoute } from "@tanstack/react-router"
import { EditProfilePage } from "@/pages/profile-edit/content"

export const Route = createFileRoute("/_app/_layout/profile-edit/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <EditProfilePage />
}
