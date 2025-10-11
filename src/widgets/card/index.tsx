import { LayoutTab } from "@/app/types/enums.ts"
import { useAppSelector } from "@/redux/hooks.ts"
import CardGrid from "@/widgets/card/layout/grid.tsx"
import CardExpanded from "@/widgets/card/layout/expanded.tsx"
import type { UserCardExpanded } from "@/app/types/global"
import { memo } from "react"

const tabs = {
  [LayoutTab.GRID]: {
    Component: CardGrid,
  },
  [LayoutTab.EXPANDED]: {
    Component: CardExpanded,
  },
} as const

export const LayoutCardList = memo(
  ({ data }: { data: UserCardExpanded[] }) => {
    const layout = useAppSelector((state) => state.layout_switch.layout)
    const { Component } = tabs[layout]
    return (
      <div className="mt-4">
        <Component data={data} />
      </div>
    )
  }
)
