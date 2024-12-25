import { MessageRequest } from "@/types/bgType";
import googAuth from "./auth/googAuth";
import ytAuth from "./auth/ytAuth";
import handleContentScriptLoading from "./urlListener/handleContentScriptLoading";

chrome.runtime.onMessage.addListener(
  (
    request: MessageRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: { status?: string; success?: boolean }) => void,
  ) => {
    if (request.action === "googleLogin") {
      googAuth(request, sendResponse);
      return true;
    }
    if (request.action === "youtubeAuth") {
      ytAuth(request, sendResponse);
      return true;
    }
  },
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleContentScriptLoading({ tab, tabId });
  }
});
