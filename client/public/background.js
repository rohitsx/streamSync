// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "googleLogin") {
    const clientID =
      "48392764782-f0jng7d1jj1pnmhhvuj8l04jeot5ihem.apps.googleusercontent.com";

    // Use your development extension ID
    const extensionId = "djdemkjkeanachbbjehacplfagbhacfb";
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
    console.log(url);

    chrome.identity.launchWebAuthFlow(
      {
        url: url.toString(),
        interactive: true,
      },
      (responseUrl) => {
		  console.log(responseUrl)
	  },

    );
  }
});
