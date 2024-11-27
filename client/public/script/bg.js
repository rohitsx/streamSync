chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const clientID =
    "48392764782-f0jng7d1jj1pnmhhvuj8l04jeot5ihem.apps.googleusercontent.com";
  if (request.action === "googleLogin") {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    const callbackUrl = chrome.identity.getRedirectURL("google");

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", clientID);
    url.searchParams.append("response_type", "token");
    url.searchParams.append("prompt", "consent select_account");
    url.searchParams.append("redirect_uri", callbackUrl);
    url.searchParams.append("scope", scopes.join(" "));
    chrome.identity.launchWebAuthFlow(
      {
        url: url.toString(),
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
  if (request.action === "youtube-auth") {
    const redirectUri = chrome.identity.getRedirectURL("google");
    const scope = "https://www.googleapis.com/auth/youtube.readonly";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      (responseUrl) => {
        try {
          const hashFragment = responseUrl.split("#")[1];
          const params = new URLSearchParams(hashFragment);
          const accessToken = params.get("access_token");

          console.log("responceurl", responseUrl, accessToken);
          sendResponse({ accessToken: accessToken });
        } catch (e) {
          console.log(e);
        }
      },
    );
    return true;
  }
});
