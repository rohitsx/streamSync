import { WsMesageProps, WsOnMessageProp } from "../../types/types.ts";
import streamRoom, { userWsObject } from "./streamRoom.ts";

export default function wsHandler(
  { socket, response, streamId }: WsMesageProps,
) {
  const stream = new streamRoom();

  socket.onclose = async () =>
    await stream.delete({ username: socket.username, streamId });

  socket.onmessage = (e) => {
    const { liveMessage, offer, answer, candidate }: WsOnMessageProp = JSON
      .parse(e.data);
    const users = userWsObject.get(streamId);

    if (liveMessage) {
      const _liveMessage = {
        id: 1,
        message: liveMessage,
        user: socket.username,
      };
      users?.forEach((ws) => {
        ws.send(JSON.stringify({ liveMessage: _liveMessage }));
      });
    } else if (offer) {
      users?.get(offer.stranger)?.send(JSON.stringify({ offer }));
    } else if (answer) {
      users?.get(answer.host)?.send(JSON.stringify({ answer }));
    }else if(candidate) 

    console.log(`RECEIVED: ${e.data}`);
  };

  return response;
}
