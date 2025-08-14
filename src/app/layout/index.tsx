import { NavBar } from "@/widgets/nav-bar/layout/ui.tsx"
import type { PropsWithChildren } from "react"
import { useRouterState } from "@tanstack/react-router"
import { FilterForm } from "@/shared/lib/filter-form"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"
import { Toaster } from "react-hot-toast"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { useLikesSocket } from "@/lib/hooks/use-likes-socket.ts"

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouterState()
  const { user: userMe } = useUserMe()
  useLikesSocket(userMe?.id)
  useInitUser()
  return (
    <div className="pt-[80px]">
      {children}
      <NavBar activePath={router.location.pathname} />
      <Toaster position="top-center" reverseOrder={false} />
      <FilterForm />
    </div>
  )
}

export default Layout
