import { IncomingLikesCard } from "@/entities/likes/like-to-me-card"
import { MyLikesCard } from "@/entities/likes/my-likes-card"
import { LikesTab } from "@/app/types/enums.ts"
import { LikeBlock } from "@/widgets/render-like-card/like-block.tsx"

const tabs = {
  [LikesTab.MUTUAL]: {
    label: "Лайки от меня",
    Component: MyLikesCard,
  },
  [LikesTab.INCOMING]: {
    label: "Входящие лайки",
    Component: IncomingLikesCard,
  },
} as const

const dataBlocks = [
  {
    id: 1,
    title: "Лайки от меня",
    path: "/likes/my-likes",
    rotate: false,
  },
  {
    id: 2,
    title: "Входящие лайки",
    path: "/likes/incoming-likes",
    rotate: true,
  },
]

export const RenderTabs = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4">
        <div className="flex flex-col gap-4">
          {dataBlocks.map((item) => (
            <LikeBlock
              key={item.id}
              title={item.title}
              rotate={item.rotate}
              path={item.path}
            />
          ))}
        </div>
        {/*<Component />*/}
      </div>
    </div>
  )
}
