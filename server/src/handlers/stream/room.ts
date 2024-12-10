import { CreateRoomProps } from "../../types/types.ts";
import YoutubeAuthHandler from "../auth/youtubeAuth.ts";
import dbRoom from "../database/dbRoom.ts";

export default class streamRoom {
  private _req: Request;
  private socket: WebSocket;
  private response: Response;
  private url: URL;
  private dbRoom: dbRoom = new dbRoom();

  constructor({ _req, socket, response }: CreateRoomProps) {
    this.socket = socket;
    this._req = _req;
    this.response = response;
    this.url = new URL(_req.url);
  }

  create() {
    const streamId = this.url.searchParams.get("streamid");
    const username = this.url.searchParams.get("username");
    const accessToken = this.url.searchParams.get("accestoken");

    if (!streamId || !username || !accessToken) return this.response;

    return this.checkToken(accessToken, streamId)
      .then((res) => {
        if (!res) return;

        this.dbRoom.create({
          streamId: streamId,
          socket: JSON.stringify(this.socket),
          username: username,
        });

        return this.response;
      })
      .catch((err) => console.log(err));
  }

  async checkToken(accessToken: string, streamId: string) {
    const ytAuth = new YoutubeAuthHandler();
    const data = await ytAuth.getLiveStreamData(accessToken);
    return data.items[0].id === streamId ? true : null;
  }
}
