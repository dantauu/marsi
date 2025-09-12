import { useEffect } from "react";
import { useTelegram } from "@/app/providers/telegram";
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts";
import { useGetUserByIdQuery } from "@/shared/api/user.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import { setToken } from "@/redux/slices/auth.ts"

export const useInitUser = () => {
  const { user } = useTelegram();
  const [initUser] = useInitUserMutation();
  const [authUser] = useAuthUserMutation();
  const token = useAppSelector((state) => state.auth.token)
  const dispatch = useAppDispatch()

  const { isError } = useGetUserByIdQuery(String(user?.id), {
    skip: !user?.id || !token,
  });

  useEffect(() => {
    if (!user) return;

    const initialize = async () => {
      try {
        if (token && isError) {
          localStorage.removeItem("jwt");
          dispatch(setToken(null));
        }

        if (!token) {
          const initUserPayload = {
            id: String(user.id),
            first_name: user.first_name,
            photo_url: user.photo_url ? [user.photo_url] : [],
            username: user.username,
          };

          const initData = await initUser(initUserPayload).unwrap();
          const { access_token } = await authUser(initData).unwrap();

          localStorage.setItem("jwt", access_token);
          dispatch(setToken(access_token));
        }
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, [user, token, isError, initUser, authUser]);
};
