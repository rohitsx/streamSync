export default function ytAuth(request, sendResponse) {
  const scope = "https://www.googleapis.com/auth/youtube.readonly";
  const redirectUri = chrome.identity.getRedirectURL("google");
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${request.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true,
    },
    async (responseUrl) => {
      try {
        console.log(responseUrl);
        const urlObj = new URL(responseUrl);
        const authCode = urlObj.searchParams.get("code");
        const response = await sendYtAuthCode(authCode, request.api);
        if (response.status === 200)
          sendResponse({ authCode: await response.json() });
        else sendResponse({ authCode: null });
      } catch (e) {
        console.log(e);
      }
    },
  );
}

async function sendYtAuthCode(authCode, api) {
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode }),
  });
}
