import { WebRtcSignalingProp, WsWithUsername } from "../../types/types.ts";
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

  webRtc(description: WebRtcSignalingProp) {
    console.log(
      "description type,",
      description.description.type,
      "to",
      description.to,
    );
    const strangerws = this.users?.get(description.to);
    strangerws?.send(JSON.stringify({ description: description.description }));
  }

  webRtcCandidate(description: WebRtcSignalingProp) {
    console.log("candidate");
    const strangerws = this.users?.get(description.to);
    strangerws?.send(JSON.stringify({ candidate: description.candidate }));
  }
}
