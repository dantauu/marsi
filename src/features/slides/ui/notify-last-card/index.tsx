type NotifyProps = {
  currentIndex: number
  usersCount: number
}

export const NotifyLastCard = ({ usersCount, currentIndex }: NotifyProps) => {
  const isEndCard = currentIndex >= usersCount

  return isEndCard ? (
    <div className="flex items-center justify-center text-[#000] bg-[#e4e4e4] rounded-[20px] h-[70px] w-full">
      <p className="font-ManropeM text-[18px]">Упс.. Вы всё пролистали 🥲</p>
    </div>
  ) : null
}
