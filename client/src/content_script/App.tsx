import { ContentBackground } from "@/layout/contentScriptLayout";
import ChatBox from "./component/chatBox";

export default function App() {
  console.log("App rendered");
  return (
    <ContentBackground>
      <ChatBox />
    </ContentBackground>
  );
}
