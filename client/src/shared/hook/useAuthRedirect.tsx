import { useCallback, useEffect } from "react";
import useDeleteToken from "./useDeleteToken";
import useCreateTab from "./useCreateTab";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useAuthRedirect() {
  const createTab = useCreateTab();
  const nav = useNavigate();
  const deleteToken = useDeleteToken();

  useEffect(() => {
    chrome.cookies.get(
      { url: import.meta.env.VITE_HOST, name: "sessionToken" },
      (cookie) => {
        console.log("recvied cookies", cookie);
        cookie?.value ? handleToken(cookie.value) : createTab("auth");
      },
    );
  }, []);

  const handleToken = useCallback(async (token: string) => {
    console.log(token);
    const handleInvalidToken = () => {
      deleteToken();
      createTab("auth");
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API}validate-token`,
        JSON.parse(token),
      );
    } catch (error) {
      handleInvalidToken();
      console.log("token auth failed");
      return;
    }

    chrome.cookies.get(
      { url: import.meta.env.VITE_HOST, name: "user" },
      (cookie) => {
        const user = cookie?.value;
        if (!user) {
          handleInvalidToken();
          return;
        }

        if (!JSON.parse(user).username) nav("/username");
        else return;
      },
    );
  }, []);
}
