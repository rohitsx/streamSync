import routerHandler from "./api.ts";
import webSocket from "./wsRoutes.ts";

export default function router(_req: Request) {
  const api = new routerHandler(_req);
  const websocket = new webSocket(_req);
  const reqType = _req.url.split("/")[3];
  return reqType === "api" ? api.routes() : websocket.routes();
}
