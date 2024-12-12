import { invalidRequest } from "../handlers/defaultResponse.ts";
import streamRoom from "../handlers/stream/room.ts";
import { ApiRoutesProps } from "../types/types.ts";

export default class webSocket {
  _req: Request;
  constructor(_req: Request) {
    this._req = _req;
  }

  routes() {
    const room = new streamRoom({ _req: this._req });

    const routes = [
      {
        path: "/ws/create-room",
        handler: () => room.create(),
      },
    ];

    return this.handleRoutes({ routes });
  }

  handleRoutes({ routes }: ApiRoutesProps): Response | Promise<Response> {
    const url = new URL(this._req.url);
    const route = routes.find(({ path }) => url.pathname === path);

    if (route) return route.handler();
    else {
      return invalidRequest();
    }
  }
}
