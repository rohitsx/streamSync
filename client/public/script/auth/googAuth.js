import makeUrl from "./makeUrl.js";

export default function googleAuth(request, sendResponse) {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  const url = makeUrl(request.clientId, "token", scopes, "online");

  chrome.identity.launchWebAuthFlow(
    {
      url: url,
      interactive: true,
    },
    async (responseUrl) => {
      try {
        const urlParams = new URLSearchParams(
          new URL(responseUrl).hash.substring(1),
        );
        const accessToken = urlParams.get("access_token");
        const response = await fetch(request.api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: accessToken,
        });
        console.log(response);
        const { token, user } = await response.json();
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
        console.log(e);
        sendResponse({ status: "error" });
      }
    },
  );
}
