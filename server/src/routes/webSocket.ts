import { invalidRequest } from "../handlers/defaultResponse.ts";
import streamRoom from "../handlers/stream/room.ts";
import { WsRoutesProps } from "../types/types.ts";

export default class webSocket {
  _req: Request;
  constructor(_req: Request) {
    this._req = _req;
  }

  routes() {
    const { socket, response } = Deno.upgradeWebSocket(this._req);

    const room = new streamRoom({ _req: this._req, socket, response });

    const routes = [
      {
        path: "/ws/create-room",
        handler: () => room.create(),
      },
    ];

    return this.handleRoutes({ socket, routes });
  }

  handleRoutes({ socket, routes }: WsRoutesProps) {
    const url = new URL(this._req.url);
    const route = routes.find(({ path }) => url.pathname === path);
    return route ? route.handler() : invalidRequest() && socket.close();
  }
}
