import sendResponse, { invalidRequest } from "../defaultResponse.ts";
import { google } from "googleapis";
import {
  GOOGLE_API_KEY,
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

    const { authCode, id } = await _req.json();
    try {
      const oauth2Client = this.getOauth2Client();

      const { tokens } = await oauth2Client.getToken(authCode);
      if (!tokens) return sendResponse("Authorization failed", 500);

      console.log(id);
      console.log(tokens);
      tokens.refresh_token && this.db.setYtRefreshToken(id, authCode);

      tokens.access_token &&
        tokens.expiry_date &&
        this.redisClient.addedAccessToken({
          id,
          token: tokens.access_token,
          ms: tokens.expiry_date,
        });

      return sendResponse("Authorization successful", 200);
    } catch (error) {
      console.error("Error during callback:", error);
      return sendResponse("Authorization failed", 500);
    }
  }

  async getYtStream(_req: Request) {
    if (_req.method !== "GET") return invalidRequest();

    const url = new URL(_req.url);
    const id = url.searchParams.get("id");
    console.log("recived id", id);
    if (!id) return sendResponse("Authorization failed", 500);
    const _accessToken = await this.getAccessToken(id);
    const response = await fetch(
      "https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus&broadcastStatus=active&broadcastType=all",
      {
        headers: {
          Authorization: `Bearer ${_accessToken}`,
          Accept: "application/json",
        },
      },
    );
    const liveStreamData = await response.json();
    console.log(liveStreamData);

    return sendResponse(liveStreamData, 200);
  }

  async getAccessToken(id: string) {
    try {
      const accessToken = await this.redisClient.getAccessToken(id);
      if (accessToken) return accessToken;

      const oauth2Client = this.getOauth2Client();

      const refreshToken = await this.db.getRefreshToken(id);
      console.log("refreshToken: ", refreshToken);

      refreshToken &&
        oauth2Client.setCredentials({
          refresh_token: refreshToken,
        });

      const _accessToken = await oauth2Client.getAccessToken();
      console.log(accessToken);
      return _accessToken;
    } catch (error) {
      console.error("Error generating access token:", error);
    }
  }
}
