import { WsMesageProps, WsWithUsername } from "../../types/types.ts";

export const userWsObject = new Map<string, WsWithUsername>();

export default function handleWsMessage({ socket, response }: WsMesageProps) {
  socket.onopen = () => {
    console.log("CONNECTED");
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
    userWsObject.delete(socket.username);
  };

  socket.onmessage = (event) => {
    console.log(`RECEIVED: ${event.data}`);
    socket.send("pong");
  };
  return response;
}
