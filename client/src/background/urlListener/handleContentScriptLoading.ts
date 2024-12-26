import { handleContentScriptLoadingProp } from "@/types/bgType";
import checkIfLiveStream from "./checkIfLiveStream";

export default async function handleContentScriptLoading(
  { tab, tabId }: handleContentScriptLoadingProp,
) {
  if (!tab.url || !tabId) return;

  const isLive = await checkIfLiveStream(tab.url);

  try {
    isLive
      ? chrome.tabs.sendMessage(tabId, { type: "page-rendered" })
      : chrome.tabs.sendMessage(tabId, { type: "remove-render" });
  } catch (err) {
    console.log("err", err);
  }
}
