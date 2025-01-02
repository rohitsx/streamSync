export interface AddedAccessTokenProps {
  id: string;
  token: string;
  ms: number;
}

export interface CreateRoomProps {
  _req: Request;
  socket: WebSocket;
  response: Response;
}

export interface ApiRoutesProps {
  routes: { path: string; handler: () => Promise<Response> | Response }[];
}

//delete this id no dbRoom.ts
export interface DbRoomCreateProp {
  streamId: string;
  username: string;
}

export interface RedisRoomMethodProp {
  streamId: string;
  username: string;
}

export interface WsWithUsername extends WebSocket {
  username: string;
}

export interface WsMesageProps {
  socket: WsWithUsername;
  response: Response;
  streamId: string;
}

export interface StartWSProp {
  _req: Request;
  username: string;
  streamId: string;
}

export interface DeleteUserProp {
  streamId?: string;
  username: string;
}

export interface StreamRoomDelProp {
  username: string;
  streamId: string;
}

export interface webRtcSignalingProp {
  host: string;
  stranger: string;
  description: {
    type: "offer" | "answer" | "rollback" | "pranswer";
    sdp?: string;
  };
}

export interface WsOnMessageProp {
  liveMessage: string;
  offer: webRtcSignalingProp;
  answer: webRtcSignalingProp;
  iceCandidate: webRtcSignalingProp;
  startCall: {
    calleeUsername: string;
  };
}
