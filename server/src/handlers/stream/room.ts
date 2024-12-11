import { CreateRoomProps, WsWithId } from "../../types/types.ts";
import YoutubeAuthHandler from "../auth/youtubeAuth.ts";
import dbRoom from "../database/dbRoom.ts";
import sendResponse from "../defaultResponse.ts";
import { invalidRequest } from "../defaultResponse.ts";

const userWsObject = new Map<string, WsWithId>();

export default class streamRoom {
  private socket: WsWithId;
  private url: URL;
  private response: Response;
  private dbRoom: dbRoom = new dbRoom();

  constructor({ _req, socket, response }: CreateRoomProps) {
    const ws = socket as WsWithId;
    ws.id = crypto.randomUUID();
    this.socket = ws;
    userWsObject.set(ws.id, this.socket);

    this.url = new URL(_req.url);
    this.response = response;
  }

  create(): Promise<Response> | Response {
    const streamId = this.url.searchParams.get("streamid");
    const username = this.url.searchParams.get("username");
    const accessToken = this.url.searchParams.get("accestoken");

    if (!streamId || !username || !accessToken) return invalidRequest();

    return this.checkToken(accessToken, streamId)
      .then(async () => {
        await this.dbRoom.create({
          streamId: streamId,
          socketId: this.socket.id,
          username: username,
        });
        return this.response;
      })
      .catch(() => sendResponse("Invalid token", 500));
  }

  async checkToken(accessToken: string, streamId: string) {
    const ytAuth = new YoutubeAuthHandler();
    const data = await ytAuth.getLiveStreamData(accessToken);
    if (data.items[0].id !== streamId) throw new Error("Invalid token");
  }
}
