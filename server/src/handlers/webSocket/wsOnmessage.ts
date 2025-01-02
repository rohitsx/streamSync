import { WsWithUsername } from "../../types/types.ts";
import { userWsObject } from "./streamRoom.ts";

export default class wsOnMessage {
  private ws: WsWithUsername;
  private users: Map<string, WsWithUsername> | undefined;

  constructor({ ws, streamId }: { ws: WsWithUsername; streamId: string }) {
    this.ws = ws;
    this.users = userWsObject.get(streamId);
  }

  broadCastChat(message: string) {
    const _liveMessage = {
      id: 1,
      message: message,
      user: this.ws.username,
    };
    this.users?.forEach((ws: WsWithUsername) => {
      ws.send(JSON.stringify({ liveMessage: _liveMessage }));
    });
  }

  startCall(hostName: string, callee: string) {
    const calleeWs = this.users?.get(callee);
    calleeWs?.send(
      JSON.stringify({ startCall: { hostName } }),
    );
  }
}
