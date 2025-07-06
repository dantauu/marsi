import SvgInspiration from "@/assets/icons/Inspiration"
import SvgFriends from "@/assets/icons/Friends.tsx"
import SvgCocktail from "@/assets/icons/Cocktail.tsx"
import SvgMessage from "@/assets/icons/Message.tsx"

const goalData = [
  {
    id: 1,
    title: "Свидание",
    description: "Найти партнёра для похода на свидание",
    icon: <SvgCocktail />,
  },
  {
    id: 2,
    title: "Дружба",
    description: "Найти друга для приятного провождения времени",
    icon: <SvgFriends />,
  },
  {
    id: 3,
    title: "Простое общение",
    description: "Найти интересного собеседника",
    icon: <SvgMessage />,
  },
  {
    id: 4,
    title: "В поисках вдохновения",
    description: "Найти человека способного вдонавлять",
    icon: <SvgInspiration />,
  },
]

export default goalData
