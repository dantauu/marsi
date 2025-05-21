import { createFileRoute } from "@tanstack/react-router"
import Search from "../../../../pages/search"

export const Route = createFileRoute("/_app/_layout/search/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Search />
}
