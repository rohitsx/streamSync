import Header from "./header";
import Chat from "./chats";
import ChatInput from "./chatInput";

export default function ChatBox() {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Chat />
      <ChatInput />
    </div>
  );
}
