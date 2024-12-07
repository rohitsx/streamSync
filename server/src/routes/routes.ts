import googleAuthhandler from "../handlers/auth/googleAuth.ts";
import YoutubeAuthHandler from "../handlers/auth/youtubeAuth.ts";
import { invalidRequest } from "../handlers/defaultResponse.ts";
import streamHandler from "../handlers/stream.ts";
import addCorsHeaders from "../middleware/cors.ts";
import { RoutesProps } from "../types/types.ts";

export default class routerHandler {
  constructor() {}
  async routes(_req: Request) {
    const googleAuth = new googleAuthhandler();
    const youtubeAuth = new YoutubeAuthHandler();
    const stream = new streamHandler();
    const routes = [
      {
        path: "/api/google-auth",
        handler: () => googleAuth.auth(_req),
      },
      {
        path: "/api/validate-token",
        handler: () => googleAuth.validateToken(_req),
      },
      {
        path: "/api/set-username",
        handler: () => googleAuth.setUsername(_req),
      },
      {
        path: "/api/youtube-auth",
        handler: () => youtubeAuth.auth(_req),
      },
      {
        path: "/api/get-yt-stream",
        handler: () => youtubeAuth.getYtStream(_req),
      },
      {
        path: "/api/start-stream",
        handler: () => stream.startStream(_req),
      },
    ];

    return await this.handlerRoute(_req, routes);
  }

  async handlerRoute(_req: Request, routes: RoutesProps[]) {
    return await addCorsHeaders(_req, async () => {
      const url = new URL(_req.url);
      const route = routes.find(({ path }) => url.pathname === path);
      return route ? await route.handler() : invalidRequest();
    });
  }
}
