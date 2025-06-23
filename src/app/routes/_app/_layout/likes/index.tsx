import { createFileRoute } from '@tanstack/react-router'
import Likes from "@/pages/likes"

export const Route = createFileRoute('/_app/_layout/likes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Likes />
}
