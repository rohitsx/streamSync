import { WsWithUsername } from "../../types/types.ts";
import dbRoom from "../database/dbRoom.ts";

export const userWsObject = new Map<string, WsWithUsername>();

export default class wsHelper {
  private _socket: WsWithUsername;

  private room = new dbRoom();
  constructor(socket: WsWithUsername) {
    this._socket = socket;
  }

  async deleteRoom() {
    try {
      const k = await this.room.detete(this._socket.username);
      console.log("WebSocket connection closed.", k);
      userWsObject.delete(this._socket.username);
    } catch {
      console.log("error");
    }
  }

  onmessage(event: MessageEvent) {
    console.log(`RECEIVED: ${event.data}`);
    this._socket.send("pong");
  }
}
