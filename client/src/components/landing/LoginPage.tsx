import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import NotifcationBox from "@/assets/notification";
import { AuthLayout, LayoutLogo } from "./Layout";

interface LoginResponse {
  message: string;
  token: string;
  username: string;
}

const LoginPage: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API}google-login`,
        {
          credential: credentialResponse.credential,
        }
      );
      
      if (response.data.message === "success_login") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        window.location.reload();
      }
    } catch (error) {
      setNotification("Failed to login with Google. Please try again.");
    }
  };

  const handleGoogleError = (): void => {
    setNotification("Google login failed. Please try again.");
  };

  return (
    <AuthLayout>
      <LayoutLogo text="Welcome back" />
      <NotifcationBox
        notificationMessage={notification}
        setNotification={setNotification}
      />
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gradient-to-br from-slate-900 to-slate-950">
              Continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_black"
              shape="pill"
              size="large"
              width="100%"
              text="continue_with"
              useOneTap
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
