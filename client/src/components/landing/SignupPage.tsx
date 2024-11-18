// signupPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotifcationBox from "@/assets/notification";
import { AuthLayout, LayoutLogo } from "./Layout";
import { Btn } from "./Layout";

interface NotificationState {
  message: string | null;
  color: "blue" | "red";
}

const SignupPage: React.FC = () => {
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    color: "red",
  });

  const handleGoogleSignup = async () => {
    chrome.runtime.sendMessage({ action: "googleLogin" }, (response) => {
      if (response.success) {
        console.log("Token received:", response.token);
        const token = response.token;
        fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token,
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Error fetching user info:", data.error);
            } else {
              const userName = data.name; // User's name
              const userEmail = data.email; // User's email
              console.log("User Name:", userName);
              console.log("User Email:", userEmail);
            }
          })
          .catch((err) => {
            console.error("Error fetching user info:", err);
          });
        // You can now use the token to make authenticated API requests
      } else {
        console.error("Login failed:", response.error);
      }
    });
  };

  return (
    <AuthLayout>
      <LayoutLogo text="Create your account" />
      <NotifcationBox
        notificationMessage={notification.message}
        setNotification={(message) =>
          setNotification((prev: any) => ({ ...prev, message }))
        }
        color={notification.color}
      />
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
          <Btn
            text="Sign up with Google"
            worker={handleGoogleSignup}
            sBtn={true}
          />
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
