import doubler from '@/assets/images/double.svg'
import Button from "@/shared/ui/buttons/button.tsx"

export const Purchase = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div>
        <img src={doubler} />
      </div>
      <Button variant="green" className="w-[210px] h-[60px] text-xl absolute bottom-[45px] -translate-x-1/2 bg-blur-green">Приобрести</Button>
    </div>
  )
}