import env from "@/config/enviroment";
import { MessageRequest } from "@/types/bgType";
import axios from "axios";

export default async function ytAuth(request: MessageRequest) {
  if (!request.userId) return { status: "No user id" };
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const redirectUri = chrome.identity.getRedirectURL("google");
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;

  const responseUrl = await chrome.identity.launchWebAuthFlow({
    url: authUrl,
    interactive: true,
  });

  if (!responseUrl) return { status: "No response URL" };

  return handleYtAuth(responseUrl, request.userId);
}

async function handleYtAuth(responseUrl: string, userId: string) {
  try {
    if (!responseUrl) throw new Error("No response URL");

    const urlObj = new URL(responseUrl);
    const authCode = urlObj.searchParams.get("code");
    if (!authCode) throw new Error("No auth code");

    console.log(authCode);
    const response = await axios.post(env.api + "youtube-auth", {
      authCode,
      id: userId,
    });

    if (response.status === 200) {
      const currentUser = await chrome.cookies.get({
        url: env.host,
        name: "user",
      });

      if (!currentUser?.value) throw new Error("No user found");

      const user = JSON.parse(currentUser.value);
      user.ytRefreshToken = true;

      chrome.cookies.set({
        url: env.host,
        name: "user",
        value: JSON.stringify(user),
      });

      return { status: true };
    } else {
      return { status: false };
    }
  } catch (e) {
    console.error(e);
    return { status: false };
  }
}
