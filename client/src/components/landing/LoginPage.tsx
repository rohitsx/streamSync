import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotifcationBox from "@/assets/notification";
import { AuthLayout, LayoutLogo } from "./Layout";
import { Btn } from "./Layout";

const LoginPage: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        console.log("Got token:", token);
      });
    } catch (error) {
      console.error("Auth error:", error);
    }
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
          <Btn
            text="Continue with Google"
            worker={handleGoogleLogin}
            sBtn={true}
          />
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
