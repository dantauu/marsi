import { Possibilities, PremiumText, Purchase } from "@/ui"

const Subscribe = () => {
  return (
    <div data-testid="subscribe" className="px-1.5">
      <PremiumText />
      <Possibilities className="mt-5" />
      <Purchase />
    </div>
  )
}

export default Subscribe
