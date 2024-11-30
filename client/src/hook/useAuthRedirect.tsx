import axios from "axios";
import { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import useCreateTab from "./useCreateTab";
import useDeleteToken from "./useDeleteToken";

export default function useAuthRedirect() {
  const [cookies] = useCookies();
  const token = useMemo(() => cookies.sessionToken, [cookies.sessionToken]);
  const createTab = useCreateTab();
  const deleteToken = useDeleteToken();

  async function checkAuth() {
    if (!token) {
      console.log("working");
      deleteToken();
      return false;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}validate-token`,
        token,
      );
      return response.data;
    } catch (error) {
      console.error("Token validation error:", error);
      deleteToken();
      return false;
    }
  }

  useEffect(() => {
    const user = cookies.user;

    if (!token && !user) createTab("auth");
    else if (user && !user.username) createTab("username");
    else {
      checkAuth().then((res) => {
        !res && createTab("auth");
        return;
      });
    }
  }, []);
}
