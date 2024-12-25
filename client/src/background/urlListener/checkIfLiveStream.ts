import { UrlListenerProp } from "@/types/bgType";
import checkIfLiveStream from "./checkLiveHelper";

export default async function urlListener({
  tabId,
  changeInfo,
  tab,
}: UrlListenerProp) {
  if (
    changeInfo.status === "complete" &&
    tab.url?.includes("youtube.com/watch") && tabId
  ) {
    const url = tab.url?.toString();
    const isLive = await checkIfLiveStream(url);
    console.log("isLive", isLive, "url", url);
    isLive
      ? chrome.scripting
        .executeScript({
          target: { tabId },
          files: ["src/content_script/ContentMain.tsx-loader.js"],
        })
      : chrome.scripting.executeScript({
        target: { tabId },
        func: () => document.querySelector("#crx-root")?.remove(),
      });
  }
}
