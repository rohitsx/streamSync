import { WsMesageProps } from "../../types/types.ts";
import streamRoom from "./streamRoom.ts";

export default function wsHandler({ socket, response }: WsMesageProps) {
  const stream= new streamRoom();

  socket.onclose = async () => await stream.delete(socket);
  socket.onmessage = (e) => console.log(`RECEIVED: ${e.data}`);

  return response;
}
