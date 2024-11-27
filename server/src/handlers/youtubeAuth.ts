import sendResponse, { invalidRequest } from "./defaultResponse.ts";

export default class youtubeAuthhandler {
  auth(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();
    return sendResponse("Not_Found", 404);
  }
}
