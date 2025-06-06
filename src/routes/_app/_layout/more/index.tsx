import More from "@/pages/more"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/_layout/more/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <More />
}
