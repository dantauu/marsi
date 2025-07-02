import { NavBar } from "@/widgets/nav-bar"
import type { PropsWithChildren } from "react"
import { useRouterState } from "@tanstack/react-router"
import { FilterForm } from "@/shared/lib/filter-form"

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouterState()
  return (
    <div className="pt-[80px]">
      {children}
      <NavBar activePath={router.location.pathname} />
      <FilterForm />
    </div>
  )
}

export default Layout
