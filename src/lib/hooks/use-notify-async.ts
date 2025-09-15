import { toast } from "sonner"

type NotifyProps = {
  success?: string
  error?: string
  loading?: string
}

export const useNotifyAsync = () => {
  const notify = async <T>(promise: Promise<T>, options?: NotifyProps) => {
    toast.promise(
      promise,
      {
        loading: options?.loading || "Загрузка",
        success: options?.success || "Успешно",
        error: options?.error || "Ошибка",
        style: { marginTop: "80px" },
        duration: 15000,
      },
    )
    return promise
  }
  return { notify }
}
