import { ContentBackground } from "@/layout/contentScriptLayout";
import ChatBox from "./component/chatBox";

export default function App() {
	console.log("workin")
  return (
    <ContentBackground>
      <ChatBox />
    </ContentBackground>
  );
}
