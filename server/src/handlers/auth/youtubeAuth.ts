import sendResponse, { invalidRequest } from "../defaultResponse.ts";
import { google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} from "../../config/environment.ts";
import UserHandler from "../database/userHandler.ts";
import RedisChase from "../database/redisChase.ts";

export default class YoutubeAuthHandler {
  db: UserHandler;
  redisClient: RedisChase;
  constructor() {
    this.db = new UserHandler();
    this.redisClient = new RedisChase();
  }
  getOauth2Client() {
    return new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI,
    );
  }

  async auth(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();

    const { authCode, email } = await _req.json();
    try {
      const oauth2Client = this.getOauth2Client();

      const { tokens } = await oauth2Client.getToken(authCode);
      if (!tokens) return sendResponse("Authorization failed", 500);

      tokens.refresh_token && this.db.setYtRefreshToken(email, authCode);

      tokens.access_token &&
        tokens.expiry_date &&
        this.redisClient.addedAccessToken({
          email,
          token: tokens.access_token,
          ms: tokens.expiry_date,
        });

      return sendResponse("Authorization successful", 200);
    } catch (error) {
      console.error("Error during callback:", error);
      return sendResponse("Authorization failed", 500);
    }
  }
}
