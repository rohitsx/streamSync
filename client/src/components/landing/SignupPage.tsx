import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NotifcationBox from "@/assets/notification";
import { AuthLayout, LayoutLogo } from "./Layout";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationColor, setNotificationColur] = useState<"blue" | "red">(
    "red",
  );
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API}signup`, {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          setNotification("Account registered, Please login");
          setNotificationColur("blue");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        if (res.data === "email_exists") {
          setNotification("This email is already registered.");
          setNotificationColur("red");
        }
      })
      .catch(() => {
        setNotification("server error please try again");
        setNotificationColur("red");
      });
  };

  return (
    <AuthLayout>
      <LayoutLogo text={"Create your account"} />

      <NotifcationBox
        notificationMessage={notification}
        setNotification={setNotification}
        color={notificationColor}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="text-base mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            className="text-base mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            className="text-base mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full text-sm py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 transform text-center"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-400 hover:text-purple-300">
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
