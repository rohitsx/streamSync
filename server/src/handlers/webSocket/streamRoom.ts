import { WsWithUsername } from "../../types/types.ts";
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
    const {
      streamid: streamId,
      username,
      accestoken: accessToken,
    } = Object.fromEntries(url.searchParams.entries());

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

  async delete(socket: WsWithUsername) {
    try {
      await this.dbRoom.detete(socket.username);
      userWsObject.delete(socket.username);
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

  startWs({ _req, username }: { _req: Request; username: string }) {
    const { socket, response } = Deno.upgradeWebSocket(_req);
    const ws = socket as WsWithUsername;
    ws.username = username;
    userWsObject.set(username, ws);
    return wsHandler({ socket: ws, response });
  }
}
