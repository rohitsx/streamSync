import makeUrl from "./makeUrl";


interface AuthResponse {
  token: string;
  user: any; // Replace 'any' with specific user type if available
}

export default function googleAuth(
  request: any,
  sendResponse: (response: { status: string }) => void
): void {
  const scopes: string[] = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  const url = makeUrl(request.clientId, "token", scopes, "online");

  chrome.identity.launchWebAuthFlow(
    {
      url: url,
      interactive: true,
    },
    async (responseUrl?: string) => {
      try {
        if (!responseUrl) throw new Error("No response URL");
        
        const urlParams = new URLSearchParams(
          new URL(responseUrl).hash.substring(1)
        );
        const accessToken = urlParams.get("access_token");
        if (!accessToken) throw new Error("No access token");

        const response = await fetch(request.api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: accessToken,
        });

        const { token, user }: AuthResponse = await response.json();

        chrome.cookies.set({
          url: request.host,
          name: "sessionToken",
          value: JSON.stringify(token),
        });

        chrome.cookies.set({
          url: request.host,
          name: "user",
          value: JSON.stringify(user),
        });

        sendResponse({ status: "success" });
      } catch (e) {
        console.error(e);
        sendResponse({ status: "error" });
      }
    }
  );
}
