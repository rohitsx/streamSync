import { useCallback } from "react";

type CookieOptions = {
  url?: string;
  name: string;
  value?: string;
};

const useChromeCookies = () => {
  const getCookie = useCallback(
    async (options: CookieOptions): Promise<chrome.cookies.Cookie | null> => {
      return new Promise((resolve, reject) => {
        chrome.cookies.get(
          { url: options.url || import.meta.env.VITE_HOST, name: options.name },
          (cookie) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError.message);
            } else {
              resolve(cookie);
            }
          },
        );
      });
    },
    [],
  );

  const setCookie = useCallback(
    async (options: CookieOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        chrome.cookies.set(
          {
            url: options.url || import.meta.env.VITE_HOST,
            name: options.name,
            value: options.value || "",
          },
          () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError.message);
            } else {
              resolve();
            }
          },
        );
      });
    },
    [],
  );

  return { getCookie, setCookie };
};

export default useChromeCookies;
