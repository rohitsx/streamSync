import sendResponse from "../handlers/defaultResponse.ts";
import routerHandler from "./routes.ts";

export default function router(_req: Request) {
  const request = new routerHandler();

  if (_req.headers.get("upgrade") != "websocket") return request.routes(_req);
  if (_req.headers.get("upgrade") === "websocket") {
    console.log("koki");
    return sendResponse("Internal Server Error", 500);
  } else return sendResponse("Internal Server Error", 500);
}
