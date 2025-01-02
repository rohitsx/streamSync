import googAuth from "./src/auth/googAuth";
import getUsername from "./src/getUsername";
import ytAuth from "./src/auth/ytAuth";
import { MessageRequest } from "@/types/bgType";
import startCall from "./src/startCall";

export default async function handleActions(request: MessageRequest) {
  const actions: Record<MessageRequest["action"], (() => any)> = {
    googleLogin: () => googAuth(),
    youtubeAuth: () => ytAuth(request),
    getUsername: () => getUsername(),
    startCall: () => startCall(request.hostName)
  };
  const res = await actions[request.action]();
  return res;
}
