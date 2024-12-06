import { invalidRequest } from "../handlers/defaultResponse.ts";
import googleAuthhandler from "../handlers/auth/googleAuth.ts";
import youtubeAuthhandler from "../handlers/auth/youtubeAuth.ts";
import addCorsHeaders from "../middleware/cors.ts";
import streamHandler from "../handlers/stream.ts";

export default function router(_req: Request) {
  const googleAuth = new googleAuthhandler();
  const youtubeAuth = new youtubeAuthhandler();
  const stream = new streamHandler();

  return addCorsHeaders(_req, async () => {
    const url = new URL(_req.url);

    let res: Response;

    switch (url.pathname) {
      case "/api/google-auth":
        res = await googleAuth.auth(_req);
        break;

      case "/api/validate-token":
        res = await googleAuth.validateToken(_req);
        break;

      case "/api/set-username":
        res = await googleAuth.setUsername(_req);
        break;

      case "/api/youtube-auth":
        res = await youtubeAuth.auth(_req);
        break;

      case "/api/get-yt-stream":
        res = await youtubeAuth.getYtStream(_req);
        break;

      case "/api/start-stream":
        res = await stream.startStream(_req);
        break;

      default:
        res = invalidRequest();
    }
    return res;
  });
}
