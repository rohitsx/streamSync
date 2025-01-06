import { WsMesageProps, WsOnMessageProp } from "../../types/types.ts";
import streamRoom from "./streamRoom.ts";
import wsOnMessage from "./wsOnmessage.ts";

export default function wsHandler(
  { socket, response, streamId }: WsMesageProps,
) {
  const stream = new streamRoom();
  const message = new wsOnMessage({ ws: socket, streamId });

  try {
    socket.onclose = async () =>
      await stream.delete({ username: socket.username, streamId });

    socket.onmessage = (e) => {
      const { liveMessage, startCall, callStatus }: WsOnMessageProp = JSON
        .parse(
          e.data,
        );

      liveMessage && message.broadCastChat(liveMessage);
      startCall && message.startCall(socket.username, startCall.calleeUsername);
      callStatus && message.callStatus(callStatus);
    };
  } catch (err) {
    console.log(err);
  }

  return response;
}
