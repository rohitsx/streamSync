import { WsMesageProps } from "../../types/types.ts";
import streamRoom, { userWsObject } from "./streamRoom.ts";

export default function wsHandler(
  { socket, response, streamId }: WsMesageProps,
) {
  const stream = new streamRoom();

  socket.onclose = async () =>
    await stream.delete({ username: socket.username, streamId });

  socket.onmessage = (e) => {
    const data = {
      id: 1,
      message: e.data,
      user: socket.username,
    };
    userWsObject.get(streamId)?.forEach((ws) => {
      ws.send(JSON.stringify(data));
    });
    console.log(`RECEIVED: ${e.data}`);
  };

  return response;
}
