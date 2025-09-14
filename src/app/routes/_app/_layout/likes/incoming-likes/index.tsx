import { createFileRoute } from "@tanstack/react-router"
import { IncomingLikes } from "@/pages/likes/incoming"

export const Route = createFileRoute("/_app/_layout/likes/incoming-likes/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <IncomingLikes />
}
