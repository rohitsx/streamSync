import { WsMesageProps } from "../../types/types.ts";
import wsHelper from "./wshelper.ts";

export default function wsHandler({ socket, response }: WsMesageProps) {
  const _ws = new wsHelper(socket);

  socket.onclose = async () => await _ws.deleteRoom();
  socket.onmessage = (e) => _ws.onmessage(e);

  return response;
}
