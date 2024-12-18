import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Username from "./pages/auth/Username";
import Home from "./pages/Home";
import "./App.css";
import Auth from "./pages/auth/Auth";
import YoutubeAuth from "./pages/auth/YoutubeAuth";
import Setting from "./pages/Setting";
import CloseTab from "./pages/closeTab";
import LiveStream from "./pages/stream/LiveStreamList";
import ChatPopUp from "./pages/stream/ChatPopUp";

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
