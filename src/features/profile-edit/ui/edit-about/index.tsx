import ItemEdit from "@/shared/ui/item-edit"
import { cn } from "@/lib/utils.tsx"

export const EditAbout = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 py-[6px] px-[4px] w-full shadow-shadow-block" +
          " rounded-[18px]",
        className
      )}
    >
      <div>
        <p className="text-xl font-HelveticaB">О себе</p>
        <ItemEdit onClick={() => {}} title="Расскажите о себе" />
      </div>
      <div>
        <p className="text-xl font-HelveticaB">Ваше образование</p>
        <ItemEdit onClick={() => {}} title="Кем вы работаете" />
      </div>
    </div>
  )
}
