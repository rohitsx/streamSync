import React from "react";

import { createRoot } from "react-dom/client";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

createRoot(document.getElementById("crx-root")!).render(<h1>hellow</h1>);
