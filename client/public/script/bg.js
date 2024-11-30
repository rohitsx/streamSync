function makeUrl(clientId, response_type, scopes, access_type) {
  const redirectUri = chrome.identity.getRedirectURL("google");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("response_type", response_type);
  url.searchParams.append("prompt", "consent select_account");
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("scope", scopes.join(" "));
  url.searchParams.append("access_type", access_type);

  return url.toString();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const clientId = request.clientId;
  const redirectUri = chrome.identity.getRedirectURL("google");

  if (request.action === "googleLogin") {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    const url = makeUrl(clientId, "token", scopes, "online");

    chrome.identity.launchWebAuthFlow(
      {
        url: url,
        interactive: true,
      },
      (responseUrl) => {
        try {
          const urlParams = new URLSearchParams(
            new URL(responseUrl).hash.substring(1),
          );
          const accessToken = urlParams.get("access_token");
          sendResponse({ accessToken: accessToken });
        } catch (e) {
          console.log(e);
        }
      },
    );
    return true;
  }
  if (request.action === "youtubeAuth") {
    const scope = "https://www.googleapis.com/auth/youtube.readonly";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`;
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (responseUrl) => {
        try {
          console.log("responseUrl:", responseUrl);
          const urlObj = new URL(responseUrl);
          const authToken = urlObj.searchParams.get("code");
          sendResponse({ authToken: authToken });
        } catch (e) {
          console.log(e);
        }
      },
    );
    return true;
  }
});
