chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "googleLogin") {
    const clientID =
      "48392764782-f0jng7d1jj1pnmhhvuj8l04jeot5ihem.apps.googleusercontent.com";
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
        const urlParams = new URLSearchParams(
          new URL(responseUrl).hash.substring(1),
        );
        const accessToken = urlParams.get("access_token");
        fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            sendResponse({ user: data });
          })
          .catch((err) => sendResponse({ error: err }));
      },
    );
    return true;
  }
});
