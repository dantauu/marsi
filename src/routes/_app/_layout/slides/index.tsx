import { createFileRoute } from "@tanstack/react-router"
import Slides from "@/pages/slides"

export const Route = createFileRoute("/_app/_layout/slides/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Slides />
}
