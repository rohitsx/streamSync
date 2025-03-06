import { createRoot } from "react-dom/client";
import App from "./App";
import styleSheet from "@/style.css?inline";

chrome.runtime.onMessage.addListener(function (request) {
  if (request && request.type === "page-rendered") {
    const element = document.querySelector("#crx-root");
    !element && Main();
  }
  if (request && request.type === "remove-render") {
    console.log("remove render");

    document.querySelector("#crx-root")?.remove();
  }
});

function Main() {
  const chatContainer = document.querySelector("#secondary-inner");
  if (!chatContainer) throw new Error("secondary-inner not found");

  const appContainer = document.createElement("div");

  const shadowHost = document.createElement("div");
  const styleElement = document.createElement("style");
  const metaElement = document.createElement("meta");

  const shadowRoot = shadowHost.attachShadow({ mode: "open" });

  shadowHost.id = "crx-root";
  styleElement.textContent = styleSheet;

  metaElement.name = "viewport";
  metaElement.content = "width=device-width, initial-scale=1.0";

  shadowRoot.appendChild(styleElement);
  shadowRoot.appendChild(metaElement);
  shadowRoot.appendChild(appContainer);

  chatContainer.parentNode?.insertBefore(shadowHost, chatContainer);

  createRoot(appContainer).render(<App />);
}
