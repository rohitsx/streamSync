import { invalidRequest } from "../handlers/defaultResponse.ts";
import googleAuthhandler from "../handlers/googleAuth.ts";
import youtubeAuthhandler from "../handlers/youtubeAuth.ts";
import addCorsHeaders from "../middleware/cors.ts";

export default function router(_req: Request) {
  const googleAuth = new googleAuthhandler();
  const youtubeAuth = new youtubeAuthhandler();

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
        res = youtubeAuth.auth(_req);
        break;

      case "/api/youtube-callback":
        res = await youtubeAuth.callBack(_req);
        break;

      default:
        res = invalidRequest();
    }
    return res;
  });
}
