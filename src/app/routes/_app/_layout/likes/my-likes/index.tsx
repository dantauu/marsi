import { createFileRoute } from "@tanstack/react-router"
import { MyLikes } from "@/pages/likes/my-likes"

export const Route = createFileRoute("/_app/_layout/likes/my-likes/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <MyLikes />
}
