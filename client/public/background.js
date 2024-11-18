chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "googleLogin") {
    chrome.identity.launchWebAuthFlow(
      {
        url: `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(
          chrome.identity.getRedirectURL(),
        )}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&prompt=select_account`,
        interactive: true,
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error("Authentication failed:", chrome.runtime.lastError);
          return;
        }

        // Extract the access token from the redirect URL
        const token = new URL(redirectUrl).hash.split("&")[0].split("=")[1];
        console.log("Access Token:", token);

        // Store or use the token for further requests
        localStorage.setItem("google_token", token);
      },
    );
  }
});
