import { useEffect, useState } from "react";
import { useTelegram } from "@/app/providers/telegram";
import { useAuthUserMutation, useInitUserMutation } from "@/shared/api/user.ts";

export const useInitUser = () => {
  const [initUser] = useInitUserMutation();
  const { user } = useTelegram();
  const [authUser] = useAuthUserMutation();
  const [isToken, setIsToken] = useState<string | null>(localStorage.getItem("jwt"));
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!user || isToken || initialized) return;

    const initialize = async () => {
      try {
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
        setInitialized(true);
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, [user, isToken, initialized, initUser, authUser]);

  return { isToken };
};
