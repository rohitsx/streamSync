import { userWsObject } from "../handlers/stream/wsMessage.ts";
import { WsMesageProps } from "../types/types.ts";

export default function wsRoutes({ socket, response }: WsMesageProps) {

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
