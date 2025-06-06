import { createFileRoute } from "@tanstack/react-router"
import Subscribe from "@/pages/subscribe"

export const Route = createFileRoute("/_app/_layout/subscribe/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Subscribe />
}
