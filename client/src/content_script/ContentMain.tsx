import { createRoot } from "react-dom/client";
import App from "./App";
import styleSheet from "@/style.css?inline"; // Make sure your bundler supports this import

function Main() {
  const chatContainer = document.querySelector("#secondary-inner");
  if (!chatContainer) throw new Error("Chat container not found");

  const appContainer = document.createElement("div");
  const shadowHost = document.createElement("div");
  const styleElement = document.createElement("style");

  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  shadowHost.id = "crx-root";
  styleElement.textContent = styleSheet;

  shadowRoot.appendChild(styleElement);
  shadowRoot.appendChild(appContainer);

  chatContainer.parentNode?.insertBefore(shadowHost, chatContainer);

  createRoot(appContainer).render(<App />);
}

Main()
