import { createRoot } from "react-dom/client";
import App from "./App";
import "@/style.css";

function Main() {
  const chatContainer = document.querySelector("#chat-container");
  if (!chatContainer) {
    throw new Error("Chat container not found");
  }

  const appContainer = document.createElement("div");
  appContainer.id = "crx-root";
  chatContainer.parentNode?.insertBefore(appContainer, chatContainer);

  createRoot(appContainer).render(<App />);
}

setTimeout(Main, 800)
