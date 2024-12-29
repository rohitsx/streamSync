import { invalidRequest } from "../handlers/defaultResponse.ts";
import streamRoom from "../handlers/webSocket/streamRoom.ts";
import { ApiRoutesProps } from "../types/types.ts";

export default class webSocket {
  _req: Request;
  constructor(_req: Request) {
    this._req = _req;
  }

  async routes() {
    const room = new streamRoom();
    const routes = [
      {
        path: "/ws/create-room",
        handler: () => room.create(this._req),
      },

      {
        path: "/ws/join-room",
        handler: () => room.join(this._req),
      },
    ];
    return await this.handleRoutes({ routes });
  }

  async handleRoutes({ routes }: ApiRoutesProps): Promise<Response> {
    const url = new URL(this._req.url);
    const route = routes.find(({ path }) => url.pathname === path);
    if (route) return await route.handler();
    else {
      return invalidRequest();
    }
  }
}
