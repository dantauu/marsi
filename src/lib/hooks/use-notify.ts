import { toast } from "react-hot-toast"

type NotifyProps = {
  success?: string
  error?: string
  loading?: string
}

export const useNotify = () => {
  const notify = <T>(promise: Promise<T>, options?: NotifyProps) => {
    return toast.promise(promise, {
      loading: options?.loading || "Загрузка",
      success: options?.success || "Успешно",
      error: options?.error || "Ошибка",
    }, {
      style: {
        marginTop: "0px"
      }
    })
  }
  return { notify }
}
