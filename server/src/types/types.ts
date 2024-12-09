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
  routes: { path: string; handler: () => Promise<Response> }[];
}

export interface WsRoutesProps {
  socket: WebSocket;
  routes: { path: string; handler: () => Response }[];
}

export interface DbRoomCreateProp {
  streamId: string;
  socketId: string;
  username: string;
}
