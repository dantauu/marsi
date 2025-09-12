import { useEffect, useState } from "react";
import { useTelegram } from "@/app/providers/telegram";
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts";
import { useGetUserByIdQuery } from "@/shared/api/user.ts";

export const useInitUser = () => {
  const { user } = useTelegram();
  const [initUser] = useInitUserMutation();
  const [authUser] = useAuthUserMutation();
  const [isToken, setIsToken] = useState<string | null>(localStorage.getItem("jwt"));

  const { isError } = useGetUserByIdQuery(String(user?.id), {
    skip: !user?.id || !isToken,
  });

  useEffect(() => {
    if (!user) return;

    const initialize = async () => {
      try {
        if (isToken && isError) {
          localStorage.removeItem("jwt");
          setIsToken(null);
        }

        if (!isToken) {
          const initUserPayload = {
            id: String(user.id),
            first_name: user.first_name,
            photo_url: user.photo_url ? [user.photo_url] : [],
            username: user.username,
          };

          const initData = await initUser(initUserPayload).unwrap();
          const { access_token } = await authUser(initData).unwrap();

          localStorage.setItem("jwt", access_token);
          setIsToken(access_token);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, [user, isToken, isError, initUser, authUser]);

  return { isToken };
};
