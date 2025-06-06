import underConstruction from "@/assets/under-construction.svg"

const More = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-ManropeM">Страница в разработке</p>
        <p className="text-5xl">🧑‍💻</p>
      </div>
      <img src={underConstruction} alt="" />
    </div>
  )
}

export default More
