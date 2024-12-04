import googAuth from "./auth/googAuth.js";
import ytAuth from "./auth/ytAuth.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "googleLogin") {
    googAuth(request, sendResponse);
    return true;
  }

  if (request.action === "youtubeAuth") {
    ytAuth(request, sendResponse);
    return true;
  }
});
