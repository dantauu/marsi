import underConstruction from "@/assets/under-construction.svg"

export const TechnicalWork = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-ManropeM">Ведутся технические работы</p>
      </div>
      <img src={underConstruction} alt="" />
    </div>
  )
}
