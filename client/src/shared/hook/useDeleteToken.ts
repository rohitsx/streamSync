import { useCallback } from "react";

export default function useDeleteToken(cookieName?: string) {
  const removeCookie = useCallback((value: string) => {
    chrome.cookies.remove({ url: import.meta.env.VITE_HOST, name: value });
  }, []);

  const deleteToken = useCallback(() => {
    console.log("deleting token");
    if (cookieName) removeCookie(cookieName);
    else {
      removeCookie("sessionToken");
      removeCookie("user");
    }
  }, []);

  return deleteToken;
}
