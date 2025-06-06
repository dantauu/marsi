export const LikeCountNotify = () => {
  const count = 10
  return (
    <div className="flex items-center justify-center mx-auto w-[200px] h-[25px] bg-main-pink rounded-[7px] mt-2 mb-4.5">
      <p className="font-ManropeM text-[13.5px] text-white">
        Вы понравились {count} людям
      </p>
    </div>
  )
}
