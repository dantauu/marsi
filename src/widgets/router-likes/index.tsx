import { LikeBlock } from "@/widgets/router-likes/like-block.tsx"

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

export const RouterLikes = () => {
  return (
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
  )
}
