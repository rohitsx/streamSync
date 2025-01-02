import {
  StartWSProp,
  StreamRoomDelProp,
  WsWithUsername,
} from "../../types/types.ts";
import YoutubeAuthHandler from "../auth/youtubeAuth.ts";
import RedisRoom from "../database/redisRoom.ts";
import sendResponse from "../defaultResponse.ts";
import { invalidRequest } from "../defaultResponse.ts";
import wsHandler from "./wsMessage.ts";
export const userWsObject = new Map<string, Map<string, WsWithUsername>>();

export default class streamRoom {
  private room = new RedisRoom();

  create(_req: Request): Promise<Response> | Response {
    const url = new URL(_req.url);
    const { streamId, username, accessToken } = Object.fromEntries(
      url.searchParams.entries(),
    );
    if (!streamId || !username || !accessToken) return invalidRequest();

    const ytAuth = new YoutubeAuthHandler();

    return ytAuth
      .validateAccessToken(accessToken, streamId)
      .then(async () => {
        await this.room.createRoom({ streamId, username });
		console.log("create map room")
        userWsObject.set(streamId, new Map<string, WsWithUsername>());
        return this.startWs({ _req, username, streamId });
      })
      .catch(() => sendResponse("Invalid token", 500));
  }

  async join(_req: Request) {
    const url = new URL(_req.url);
    const { streamId, username } = Object.fromEntries(
      url.searchParams.entries(),
    );

    await this.room.addUserToRoom({ streamId, username });
    return this.startWs({ _req, username, streamId });
  }

  async delete({ username, streamId }: StreamRoomDelProp) {
    try {
      userWsObject.get(streamId)?.delete(username);
      const userRemoved = await this.room.removeUserFromRoom({
        streamId,
        username,
      });
      console.log("user removed");
      if (userRemoved) return;
      const roomdelete = await this.room.deleteRoom(streamId);
      if (roomdelete) userWsObject.delete(streamId);
      else throw new Error("Room not deleted");
    } catch {
      console.log("error");
    }
  }

  async checkStream(_req: Request): Promise<Response> {
    const streamId = await _req.text();
    const streamExits = await this.room.checkRoomExists(streamId);
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
	console.log(username, "joined room ", streamId)
    userWsObject.get(streamId)?.set(username, ws);
    return wsHandler({ socket: ws, response, streamId });
  }
}
