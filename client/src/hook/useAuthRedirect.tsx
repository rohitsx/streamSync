import axios from "axios";
import { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import useCreateTab from "./useCreateTab";

export default function useAuthRedirect() {
  const [cookies, , removeCookie] = useCookies();
  const token = useMemo(() => cookies.token, [cookies.token]);
  const createTab = useCreateTab();
  const deleteToken = () => {
    removeCookie("user");
    removeCookie("token");
  };

  async function checkAuth() {
    if (!token) {
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
        console.log(res);
        !res && createTab("auth");
        return;
      });
    }
  }, []);
}
