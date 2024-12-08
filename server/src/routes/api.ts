import googleAuthhandler from "../handlers/auth/googleAuth.ts";
import YoutubeAuthHandler from "../handlers/auth/youtubeAuth.ts";
import { invalidRequest } from "../handlers/defaultResponse.ts";
import streamHandler from "../handlers/stream.ts";
import addCorsHeaders from "../middleware/cors.ts";
import { RoutesProps } from "../types/types.ts";

export default class routerHandler {
  _req: Request;
  constructor(_req: Request) {
    this._req = _req;
  }
  async routes() {
    const googleAuth = new googleAuthhandler();
    const youtubeAuth = new YoutubeAuthHandler();
    const stream = new streamHandler();

    const routes = [
      {
        path: "/api/google-auth",
        handler: () => googleAuth.auth(this._req),
      },
      {
        path: "/api/validate-token",
        handler: () => googleAuth.validateToken(this._req),
      },
      {
        path: "/api/set-username",
        handler: () => googleAuth.setUsername(this._req),
      },
      {
        path: "/api/youtube-auth",
        handler: () => youtubeAuth.auth(this._req),
      },
      {
        path: "/api/get-yt-stream",
        handler: () => youtubeAuth.getYtStream(this._req),
      },
      {
        path: "/api/start-stream",
        handler: () => stream.startStream(this._req),
      },
    ];

    return await this.handlerRoute(this._req, routes);
  }

  async handlerRoute(_req: Request, routes: RoutesProps[]) {
    return await addCorsHeaders(_req, async () => {
      const url = new URL(_req.url);
      const route = routes.find(({ path }) => url.pathname === path);
      return route ? await route.handler() : invalidRequest();
    });
  }
}
