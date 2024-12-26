import { useCallback, useEffect } from "react";
import useDeleteToken from "./useDeleteToken";
import useCreateTab from "./useCreateTab";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useChromeCookies from "./useChromeCookies";

export default function useAuthRedirect() {
  const createTab = useCreateTab();
  const nav = useNavigate();
  const deleteToken = useDeleteToken();
  const { getCookie } = useChromeCookies();

  useEffect(() => {
    handleToken();
  }, []);

  const handleInvalidToken = useCallback(() => {
    deleteToken();
    createTab("auth");
  }, []);

  const handleToken = useCallback(async () => {
    console.log("this on is running");
    const cookie = await getCookie({ name: "sessionToken" });
    console.log({ "sessionToken": cookie?.value });
    if (!cookie) return createTab("auth");

    const token = cookie.value;

    try {
      await axios.post(
        `${import.meta.env.VITE_API}validate-token`,
        JSON.parse(token),
      );
      handleUsernamePageNav();
    } catch (error) {
      handleInvalidToken();
      console.log("token auth failed");
      return;
    }
  }, []);

  const handleUsernamePageNav = useCallback(async () => {
    const userCooki = await getCookie({ name: "user" });
    const user = userCooki?.value;
    if (!user) {
      handleInvalidToken();
      return;
    }
    if (!JSON.parse(user).username) nav("/username");
  }, []);
}
