import { useEffect, useState } from "react";
import { server } from "../../helpers/server";

export function useProfile(uid) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    server
      .get("/profile", {
        signal: controller.signal,
        params: {
          u: uid,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setProfile(null);
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [uid]);

  return { profile, isLoading, error };
}
