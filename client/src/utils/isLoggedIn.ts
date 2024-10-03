import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

async function checkAutch() {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    return false;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API}validate-token`,
      { token }
    );
    return response.data.valid;
  } catch (error) {
    console.error("Token validation error:", error);
    localStorage.clear();
    return false;
  }
}

export default async function isLoggedIn() {
  const navigate = useNavigate();
  const loc = useLocation();  

  useEffect(() => {
    checkAutch().then((res) => {
      if (res) navigate(loc.pathname);
      else {
        localStorage.clear();
        navigate("/landing"); 
      }
    });
  }, []);
}
