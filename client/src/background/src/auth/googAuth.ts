import { AuthResponse } from "@/types/bgType";
import makeUrl from "./makeUrl";
import env from "@/config/enviroment";
import axios from "axios";

export default async function googleAuth(): Promise<{ status: string }> {
  const url = makeUrl(env.clientId, "token", "online");

  const responseUrl = await chrome.identity.launchWebAuthFlow(
    {
      url: url,
      interactive: true,
    },
  );

  if (!responseUrl) return { status: "No response URL" };
  return handleAuth(responseUrl);
}

async function handleAuth(responseUrl: string) {
  try {
    const urlParams = new URLSearchParams(
      new URL(responseUrl).hash.substring(1),
    );
    const accessToken = urlParams.get("access_token");
    if (!accessToken) return { status: "No access token" };

    const response = await axios.post(env.api+"google-auth", accessToken);

    const { token, user }: AuthResponse = response.data;

    setCookie("sessionToken", token);
    setCookie("user", user);

    return { status: "success" };
  } catch (e) {
    console.error(e);
    return { status: "error" };
  }
}

function setCookie(name: string, value: any) {
  chrome.cookies.set({
    url: env.host,
    name: name,
    value: JSON.stringify(value),
    expirationDate: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
  });
}
