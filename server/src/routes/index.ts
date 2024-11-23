import { invalidRequest } from "../handlers/defaultResponse.ts";
import googleAuthhandler from "../handlers/googleAuth.ts";
import addCorsHeaders from "../middleware/cors.ts";

export default function router(_req: Request) {
  const googleAuth = new googleAuthhandler();
  return addCorsHeaders(_req, async () => {
    const url = new URL(_req.url);

    let res: Response;

    switch (url.pathname) {
      case "/api/google-auth":
        res = await googleAuth.auth(_req);
        break;
      default:
        res = invalidRequest();
    }
    return res;
  });
}
