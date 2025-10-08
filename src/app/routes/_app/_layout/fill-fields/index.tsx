import { createFileRoute } from "@tanstack/react-router"
import { FillFields } from "@/pages/fill-fields"

export const Route = createFileRoute("/_app/_layout/fill-fields/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <FillFields />
}
