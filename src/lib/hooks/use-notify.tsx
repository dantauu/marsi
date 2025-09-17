import { toast } from "sonner"
import { motion } from "framer-motion"

type NotifyAsyncProps = {
  success?: string
  error?: string
  loading?: string
  duration?: number
}

type NotifyCustomProps = {
  message: string
  icon?: React.ReactNode | string
  duration?: number
}

export const useNotify = () => {
  function notify<T>(
    promise: Promise<T>,
    options?: NotifyAsyncProps
  ): Promise<T>
  function notify(options: NotifyCustomProps): void
  function notify<T>(
    arg1: Promise<T> | NotifyCustomProps,
    arg2?: NotifyAsyncProps
  ) {
    if (arg1 instanceof Promise) {
      toast.promise(arg1, {
        loading: arg2?.loading || "Загрузка...",
        success: arg2?.success || "Успешно",
        error: arg2?.error || "Ошибка",
        duration: arg2?.duration ?? 15000,
        style: {
          marginTop: "80px",
          fontSize: "17.2px",
        },
      })
      return arg1
    }

    toast.custom(
      (t) => (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 100) {
              toast.dismiss(t)
            }
          }}
          className="bg-white shadow-shadow-block rounded-xl p-4 flex text-[18px] items-center gap-2 mt-[80px] cursor-grab"
        >
          <span>{arg1.message}</span>
          {arg1.icon && <span>{arg1.icon}</span>}
        </motion.div>
      ),
      { duration: arg1.duration ?? 15000 }
    )
  }

  return { notify }
}
