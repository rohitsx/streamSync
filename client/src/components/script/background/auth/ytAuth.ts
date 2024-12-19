
async function sendYtAuthCode(
  authCode: string,
  id: string,
  api: string
): Promise<Response> {
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode, id }),
  });
}

export default function ytAuth(
  request: any,
  sendResponse: (response: { success: boolean }) => void
): void {
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const redirectUri = chrome.identity.getRedirectURL("google");
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${request.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    async (responseUrl?: string) => {
      try {
        if (!responseUrl) throw new Error("No response URL");

        const urlObj = new URL(responseUrl);
        const authCode = urlObj.searchParams.get("code");
        if (!authCode) throw new Error("No auth code");

        const response = await sendYtAuthCode(
          authCode,
          request.id,
          request.api
        );

        if (response.status === 200) {
          const currentUser = await chrome.cookies.get({
            url: request.host,
            name: "user",
          });
          
          if (!currentUser?.value) throw new Error("No user found");
          
          const user = JSON.parse(currentUser.value);
          user.ytRefreshToken = true;
          
          chrome.cookies.set({
            url: request.host,
            name: "user",
            value: JSON.stringify(user),
          });
          
          sendResponse({ success: true });
        } else {
          sendResponse({ success: false });
        }
      } catch (e) {
        console.error(e);
        sendResponse({ success: false });
      }
    }
  );
}
