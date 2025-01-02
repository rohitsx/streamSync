import { WsMesageProps, WsOnMessageProp } from "../../types/types.ts";
import streamRoom from "./streamRoom.ts";
import wsOnMessage from "./wsOnmessage.ts";

export default function wsHandler(
  { socket, response, streamId }: WsMesageProps,
) {
  const stream = new streamRoom();
  const message = new wsOnMessage({ ws: socket, streamId });

  socket.onclose = async () =>
    await stream.delete({ username: socket.username, streamId });

  socket.onmessage = (e) => {
    const { liveMessage, startCall }: WsOnMessageProp = JSON.parse(e.data);

    liveMessage && message.broadCastChat(liveMessage);
    startCall && message.startCall(socket.username, startCall.calleeUsername);

    return response;
  };

  return response;
}
