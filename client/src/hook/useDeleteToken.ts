import { useCookies } from "react-cookie";

export default function useDeleteToken(cookieName?: [string]) {
  const [, , removeCookie] = useCookies();
  const deleteToken = () => {
    console.log("deleting token");
    if (cookieName) {
      for (const cookie of cookieName) {
        removeCookie(cookie);
      }
    } else {
      removeCookie("sessionToken");
      removeCookie("user");
    }
  };
  return deleteToken;
}
