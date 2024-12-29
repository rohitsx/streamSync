import {
  StartWSProp,
  StreamRoomDelProp,
  WsWithUsername,
} from "../../types/types.ts";
import YoutubeAuthHandler from "../auth/youtubeAuth.ts";
import dbRoom from "../database/dbRoom.ts";
import sendResponse from "../defaultResponse.ts";
import { invalidRequest } from "../defaultResponse.ts";
import wsHandler from "./wsMessage.ts";
export const userWsObject = new Map<string, WsWithUsername>();

export default class streamRoom {
  private dbRoom = new dbRoom();

  create(_req: Request): Promise<Response> | Response {
    const url = new URL(_req.url);
    console.log(url);
    const { streamId, username, accessToken } = Object.fromEntries(
      url.searchParams.entries(),
    );
    console.log(streamId, username, accessToken);

    if (!streamId || !username || !accessToken) return invalidRequest();

    const ytAuth = new YoutubeAuthHandler();

    return ytAuth
      .validateAccessToken(accessToken, streamId)
      .then(async () => {
        await this.dbRoom.create({
          streamId: streamId,
          username: username,
        });

        return this.startWs({ _req, username });
      })
      .catch(() => sendResponse("Invalid token", 500));
  }

  async join(_req: Request) {
    const url = new URL(_req.url);
    const { streamId, username } = Object.fromEntries(
      url.searchParams.entries(),
    );

    const check = await this.dbRoom.join({ streamId, username });
	console.log(check)
    return this.startWs({ _req, username, streamId });
  }

  async delete({ username, streamId }: StreamRoomDelProp) {
    try {
      console.log("deleted user", username);
      userWsObject.delete(username);
      console.log(userWsObject);
      await this.dbRoom.detete({ username: username, streamId });
    } catch {
      console.log("error");
    }
  }

  async checkStream(_req: Request): Promise<Response> {
    const streamId = await _req.text();
    const streamExits = await this.dbRoom.checkStream(streamId);
    return sendResponse(
      streamExits ? "Stream already exists" : "Stream not found",
      streamExits ? 200 : 404,
    );
  }

  startWs(
    { _req, username, streamId }: StartWSProp,
  ) {
    const { socket, response } = Deno.upgradeWebSocket(_req);
    const ws = socket as WsWithUsername;
    ws.username = username;
    userWsObject.set(username, ws);
	console.log(userWsObject)
    return wsHandler({ socket: ws, response, streamId });
  }
}
