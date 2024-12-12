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

export interface DbRoomCreateProp {
  streamId: string;
  username: string;
}

export interface WsWithUsername extends WebSocket {
  username: string;
}
