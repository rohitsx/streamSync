import { ContentBackground } from "@/layout/contentScriptLayout";
import ChatBox from "./chatBox/chatBox";

export default function App() {
  return (
    <ContentBackground>
      <ChatBox />
    </ContentBackground>
  );
}
