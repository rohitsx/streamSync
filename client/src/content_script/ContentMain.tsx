import { createRoot } from "react-dom/client";
import App from "./App";
import styleSheet from "@/style.css?inline"; // Make sure your bundler supports this import

function Main() {
  const chatContainer = document.querySelector("#secondary-inner");
  if (!chatContainer) {
    throw new Error("Chat container not found");
  }

  const appContainer = document.createElement("div");

  // Attach a Shadow DOM
  const shadowHost = document.createElement("div");
  shadowHost.id = "crx-root";
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  // Create and append style element
  const styleElement = document.createElement("style");
  styleElement.textContent = styleSheet;
  shadowRoot.appendChild(styleElement);

  shadowRoot.appendChild(appContainer);
  chatContainer.parentNode?.insertBefore(shadowHost, chatContainer);

  createRoot(appContainer).render(<App />);
}

Main();
