import { CreateRoomProps } from "../types/types.ts";
import YoutubeAuthHandler from "./auth/youtubeAuth.ts";
import sendResponse, { invalidRequest } from "./defaultResponse.ts";

export default class streamHandler {
  async startStream(_req: Request) {
    if (_req.method !== "POST") return invalidRequest();
    const { streamId, accessToken } = await _req.json();
    if (!streamId || !accessToken) return invalidRequest();

    const ytAuth = new YoutubeAuthHandler();
    const data = await ytAuth.getLiveStreamData(accessToken);
    if (data.items[0].id !== streamId) return invalidRequest();

    await this.createRoom({ streamId, accessToken });

    return sendResponse({ streamId, accessToken }, 200);
  }

  private async createRoom({ streamId, accessToken, socketId }: CreateRoomProps) {
    console.log(streamId, accessToken);
  }
}
