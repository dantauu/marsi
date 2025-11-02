import { createFileRoute } from "@tanstack/react-router"
import { Settings } from "@/pages/settings"

export const Route = createFileRoute("/_app/_layout/settings/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Settings />
}
