import { NavBar } from "@/widgets/nav-bar/layout"
import { type PropsWithChildren } from "react"
import { useRouterState } from "@tanstack/react-router"
import { FilterForm } from "@/app/containers/filters"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useLikesSocket } from "@/lib/hooks/use-likes-socket.ts"
import { Toaster } from "sonner"
import { usePlatform } from "@/shared/lib/hooks/use-platform.ts"

const Layout = ({ children }: PropsWithChildren) => {
  useInitUser()
  const router = useRouterState()
  const { user: userMe } = useCurrentUser()
  useLikesSocket(userMe?.id)
  const { isMobile } = usePlatform()
  return (
    <div
      className={`max-w-[610px] mx-auto ${isMobile ? "pt-[80px]" : "pt-[20px]"}`}
    >
      {children}
      <NavBar activePath={router.location.pathname} />
      <Toaster position="top-center" />
      <FilterForm />
    </div>
  )
}

export default Layout
