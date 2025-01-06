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

  callStatus(
    data: { callStatus: "connected" | "connect" | "disconnected"; to: string },
  ) {
    const { callStatus, to } = data;
    console.log("recived callStatus", { callStatus, to });
    this.users?.get(to)?.send(JSON.stringify({ callStatus }));
  }

  send(name: string, { to, data }: {
    to: string;
    data: string | Record<string, unknown>;
  }) {
    const receiverWs = this.users?.get(to);
    if (!receiverWs) throw new Error("user not found");
    receiverWs.send(
      JSON.stringify({ name, data, to, sender: this.ws.username }),
    );
  }
}
