import { CardUnsubscribe } from "@/entities/likes/card-unsubscribe"
import { useState } from "react"
import { cn } from "@/lib/utils/cn.tsx"
import { CardSubscribe } from "@/entities/likes/card-subscribe"
import { LikesTab } from "@/app/types/enums.ts"

const tabs = {
  [LikesTab.MUTUAL]: {
    label: "Взаимные лайки",
    Component: CardSubscribe,
  },
  [LikesTab.INCOMING]: {
    label: "Входящие лайки",
    Component: CardUnsubscribe,
  },
} as const

export const RenderTabs = () => {
  const [activeTab, setActiveTab] = useState(LikesTab.MUTUAL)
  const { Component } = tabs[activeTab]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between h-[60px] gap-2 rounded-[10px] shadow-shadow-block">
        {Object.entries(tabs).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as LikesTab)}
            className={cn(
              "px-4 h-full rounded-[10px] font-ManropeM transition-all",
              activeTab === key ? "bg-main-pink text-white" : "text-black"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Component />
      </div>
    </div>
  )
}
