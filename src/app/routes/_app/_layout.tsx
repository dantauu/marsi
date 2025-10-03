import Layout from "@/app/layout"
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"

export const Route = createFileRoute("/_app/_layout")({
  component: () => <LayoutContent />,
})

function LayoutContent() {
  const location = useRouterState({ select: (s) => s.location })
  return (
    <Layout>
      <div className="relative overflow-hidden">
        <AnimatePresence mode={"wait"}>
          <motion.div
            key={location.pathname}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.23, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  )
}
