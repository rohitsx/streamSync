import sendResponse, { invalidRequest } from "./defaultResponse.ts";
import { google } from "googleapis";

export default class youtubeAuthhandler {
  auth(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();
    const googleAuthUrl = this.getToken();
    return sendResponse(googleAuthUrl, 200);
  }

  getToken() {
    console.log("working");
    const clientId =
      "48392764782-f0jng7d1jj1pnmhhvuj8l04jeot5ihem.apps.googleusercontent.com";
    const redirect_uri =
      "https://rohitsx.github.io/landingPage/auth/streamSync/index.html";
    const clientSecret = "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";

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirect_uri,
    );
    const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      redirect_uri: redirect_uri,
      scope: scopes,
    });
    console.log(url);
    return url;
  }

  callBack() {
    console.log("hori hai");
    return sendResponse("hori hai", 200);
  }
}
