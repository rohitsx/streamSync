import { useCallback } from "react";

function useGetCookie() {
  return useCallback(
    async (
      name: string,
      url = import.meta.env.VITE_HOST,
    ): Promise<string | null> => {
      if (!url) url = import.meta.env.VITE_HOST;
      const cookie = await chrome.cookies.get({ url, name });

      if (cookie) return await JSON.parse(cookie.value);
      else return null;
    },
    [],
  );
}

export default useGetCookie;
