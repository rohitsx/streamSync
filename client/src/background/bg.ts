import googAuth from "./auth/googAuth";
import ytAuth from "./auth/ytAuth";

chrome.runtime.onMessage.addListener((
  request: {
    action: string;
    clientId?: string;
    api?: string;
    host?: string;
    id?: string;
  },
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: { status?: string; success?: boolean }) => void
) => {
  if (request.action === "googleLogin") {
    googAuth(request, sendResponse);
    return true;
  }
  if (request.action === "youtubeAuth") {
    ytAuth(request, sendResponse);
    return true;
  }
});
