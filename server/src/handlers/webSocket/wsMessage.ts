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
    const { liveMessage, offer, answer, iceCandidate }: WsOnMessageProp = JSON
      .parse(e.data);

    if (liveMessage) message.broadCastChat(liveMessage);

    return response;
  };

  return response;
}
