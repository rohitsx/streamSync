export interface AddedAccessTokenProps {
  id: string;
  token: string;
  ms: number;
}

export interface CreateRoomProps {
  streamId: string;
  accessToken: string;
  socketId: string;
}

