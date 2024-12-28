import { MessageRequest } from "@/types/bgType";
import handleContentScriptLoading from "./src/urlListener/handleContentScriptLoading";
import handleActions from "./actions";

chrome.runtime.onMessage.addListener(
  (
    request: MessageRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (res: any) => void,
  ) => {
    _sender.id === import.meta.env.VITE_EXTENSION_ID &&
      handleActions(request).then(sendResponse);
    return true;
  },
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url?.startsWith("https://www.youtube.com")
  ) {
    handleContentScriptLoading({ tab, tabId });
  }
});
