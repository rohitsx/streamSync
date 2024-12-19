import { createRoot } from "react-dom/client";
import App from "./components/App";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

createRoot(document.getElementById("crx-root")!).render(<App />);
