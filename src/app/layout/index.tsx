import { NavBar } from "@/widgets/nav-bar/layout"
import type { PropsWithChildren } from "react"
import { useRouterState } from "@tanstack/react-router"
import { FilterForm } from "@/shared/lib/filter-form"
import { useInitUser } from "@/lib/hooks/use-init-user.ts"

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouterState()
  useInitUser()
  return (
    <div className="pt-[80px]">
      {children}
      <NavBar activePath={router.location.pathname} />
      <FilterForm />
    </div>
  )
}

export default Layout
