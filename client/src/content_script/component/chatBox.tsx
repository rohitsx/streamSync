import Header from "./header";
import Chat from "./chats";
import ChatInput from "./chatInput";
import { useMemo } from "react";

export default function ChatBox() {
  const ws = useMemo(async () => {
    const currectUrl = window.location.href;
    console.log(currectUrl);
    const streamId = new URL(currectUrl).searchParams.get("v");
    const res = await chrome.runtime.sendMessage({ action: "getUsername" });
    console.log(res);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Chat />
      <ChatInput />
    </div>
  );
}
