import { WsWithUsername } from "../../types/types.ts";
import YoutubeAuthHandler from "../auth/youtubeAuth.ts";
import dbRoom from "../database/dbRoom.ts";
import sendResponse from "../defaultResponse.ts";
import { invalidRequest } from "../defaultResponse.ts";

const userWsObject = new Map<string, WsWithUsername>();

export default class streamRoom {
  private dbRoom: dbRoom = new dbRoom();
  private _req: Request;

  constructor({ _req }: { _req: Request }) {
    this._req = _req;
  }

  create(): Promise<Response> | Response {
    const ytAuth = new YoutubeAuthHandler();
    const { socket, response } = Deno.upgradeWebSocket(this._req);
    const ws = socket as WsWithUsername;
    const url = new URL(this._req.url);

    const {
      streamid: streamId,
      username,
      accestoken: accessToken,
    } = Object.fromEntries(url.searchParams.entries());

    if (!streamId || !username || !accessToken) return invalidRequest();

    return ytAuth
      .validateAccessToken(accessToken, streamId)
      .then(async () => {
        await this.dbRoom.create({
          streamId: streamId,
          username: username,
        });

        ws.username = username;
        userWsObject.set(username, ws);
        return response;
      })
      .catch(() => sendResponse("Invalid token", 500));
  }

  async delete(): Promise<Response> {
    if (this._req.method !== "POST") return invalidRequest();

    const { username } = await this._req.json();
    const socket = userWsObject.get(username);
    socket?.close();

    userWsObject.delete(username);
    return sendResponse("Room deleted", 200);
  }
}
