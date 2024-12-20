import React from "react";
import "@/style.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Username from "./auth/Username";
import Home from "./pages/Home";
import Auth from "./auth/Auth";
import YoutubeAuth from "./auth/YoutubeAuth";
import Setting from "./pages/Setting";
import CloseTab from "./pages/closeTab";
import LiveStream from "./stream/LiveStreamList";
import ChatPopUp from "./stream/ChatPopUp";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/username" element={<Username />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/ytAuth" element={<YoutubeAuth />} />
        <Route path="/livestream" element={<LiveStream />} />
        <Route
          path="/chat/:streamId/:token/:username"
          element={<ChatPopUp />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route path="/close" element={<CloseTab />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
