import { createFileRoute } from "@tanstack/react-router"
import { DeletedPage } from "@/pages/deleted"

export const Route = createFileRoute("/_app/_layout/deleted/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <DeletedPage />
}
