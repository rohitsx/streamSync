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
        const urlObj = new URL(responseUrl);
        const authCode = urlObj.searchParams.get("code");

        const response = await sendYtAuthCode(
          authCode,
          request.id,
          request.api,
        );

        if (response.status === 200) {
          const currentUser = await chrome.cookies.get({
            url: request.host,
            name: "user",
          });
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
        console.log(e);
      }
    },
  );
}

async function sendYtAuthCode(authCode, id, api) {
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode, id }),
  });
}
