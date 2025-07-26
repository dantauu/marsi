import { createFileRoute } from "@tanstack/react-router"
import { SearchId } from "@/pages/search-id"

export const Route = createFileRoute("/_app/_layout/search-id/$id")({
  component: RouteComponent,
})

function RouteComponent() {
  return <SearchId />
}
