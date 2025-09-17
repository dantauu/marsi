import { NavBar } from "@/widgets/nav-bar/layout"
import { type PropsWithChildren } from "react"
import { useRouterState } from "@tanstack/react-router"
import { FilterForm } from "@/shared/lib/filter-form"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import { useLikesSocket } from "@/lib/hooks/use-likes-socket.ts"
import { useTelegram } from "@/app/providers/telegram"
import { Toaster } from "sonner"

const Layout = ({ children }: PropsWithChildren) => {
  useInitUser()
  const router = useRouterState()
  const { user: userMe } = useUserMe()
  useLikesSocket(userMe?.id)
  const { webApp } = useTelegram()
  const platform = webApp?.platform ?? ""
  const mobile = ["android", "ios"]
  return (
    <div
      className={`max-w-[610px] mx-auto ${mobile.includes(platform) ? "pt-[80px]" : "pt-[20px]"}`}
    >
      {children}
      <NavBar activePath={router.location.pathname} />
      <Toaster position="top-center" />
      <FilterForm />
    </div>
  )
}

export default Layout
