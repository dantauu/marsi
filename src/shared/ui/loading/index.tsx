import SvgSpinnerBalls from "@/assets/icons/SpinnerBalls.tsx"

const LoadingBalls = () => {
  return (
    <div className="flex items-center justify-center pb-40 w-full h-10">
      <SvgSpinnerBalls className="w-17 h-17" />
    </div>
  )
}

export default LoadingBalls
