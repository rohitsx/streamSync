import sendResponse, { invalidRequest } from "./defaultResponse.ts";
import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from "../config/environment.ts";

export default class YoutubeAuthHandler {
  getOauth2Client() {
    return new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
  }

  auth(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();

    const googleAuthUrl = this.getToken();
    return sendResponse(googleAuthUrl, 200);
  }

  getToken() {
    const oauth2Client = this.getOauth2Client();
    const scopes = [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      redirect_uri: GOOGLE_REDIRECT_URI,
      scope: scopes,
    });
    return url;
  }

  async callBack(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();

    try {
      const authCode = await _req.json();
      const oauth2Client = this.getOauth2Client();

      const { tokens } = await oauth2Client.getToken(authCode.code);
      console.log(tokens);
      oauth2Client.setCredentials(tokens);

      return sendResponse("Authorization successful", 200);
    } catch (error) {
      console.error("Error during callback:", error);
      return sendResponse("Authorization failed", 500);
    }
  }
}
