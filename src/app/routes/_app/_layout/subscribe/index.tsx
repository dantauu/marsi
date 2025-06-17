import Subscribe from "@/pages/subscribe"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_app/_layout/subscribe/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Subscribe />
}
