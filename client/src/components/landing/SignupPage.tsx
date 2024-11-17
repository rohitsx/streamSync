import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import NotifcationBox from "@/assets/notification";
import { AuthLayout, LayoutLogo } from "./Layout";

interface SignupResponse {
  status: number;
  data:
    | string
    | {
        message: string;
      };
}

interface NotificationState {
  message: string | null;
  color: "blue" | "red";
}

const SignupPage: React.FC = () => {
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    color: "red",
  });
  const navigate = useNavigate();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      const response = await axios.post<SignupResponse>(
        `${import.meta.env.VITE_API}google-signup`,
        {
          credential: credentialResponse.credential,
        },
      );

      if (response.status === 201) {
        setNotification({
          message: "Account registered successfully! Redirecting to login...",
          color: "blue",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data === "email_exists"
      ) {
        setNotification({
          message: "This Google account is already registered.",
          color: "red",
        });
      } else {
        setNotification({
          message: "Failed to register. Please try again.",
          color: "red",
        });
      }
    }
  };

  const handleGoogleError = (): void => {
    setNotification({
      message: "Google signup failed. Please try again.",
      color: "red",
    });
  };

  return (
    <AuthLayout>
      <LayoutLogo text="Create your account" />

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gradient-to-br from-slate-900 to-slate-950">
              Sign up with
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
              text="signup_with"
              useOneTap={false}
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Log In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
