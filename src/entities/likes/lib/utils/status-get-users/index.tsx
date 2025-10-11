import { useEffect, useRef } from "react"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"

type StatusGetNotifyProps = {
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
}
//this hook can process any status, but isFetching and isSuccess - overkill
export const useGetUsersStatus = ({
  isFetching,
  isSuccess,
  isError,
}: StatusGetNotifyProps) => {
  const { notify } = useNotify()
  const prev = useRef({ isFetching: false, isSuccess: false, isError: false })
  useEffect(() => {
    // if (!prev.current.isFetching && isFetching) {
    //   notify({ message: "Загрузка..." })
    // }
    // if (!prev.current.isSuccess && isSuccess) {
    //   notify({
    //     message: "Успешно",
    //     duration: 1500,
    //   })
    // }
    if (!prev.current.isError && isError) {
      notify({
        message: "Ошибка",
        duration: 3000,
      })
    }

    prev.current = { isFetching, isSuccess, isError }
  }, [isFetching, isSuccess, isError, notify])
}
