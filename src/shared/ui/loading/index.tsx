import SvgSpinnerBalls from "@/assets/icons/SpinnerBalls.tsx"

const LoadingBalls = () => {
  return (
    <div className="flex items-center justify-center pb-40 w-full min-h-screen">
      <SvgSpinnerBalls className="w-17 h-17" />
    </div>
  )
}

export default LoadingBalls
