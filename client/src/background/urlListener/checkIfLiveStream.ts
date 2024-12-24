import { UrlListenerProp } from "@/types/bgType";

let currectUrl: string | null = null;

export default function urlListener({
  tabId,
  changeInfo,
  tab,
}: UrlListenerProp) {
  const checkIfLiveStream = async () => {
    try {
      const url = tab.url?.toString();
      if (!url) return;
      const res = await fetch(url);
      const html = await res.text();
      const isLive = html.includes(
        '<meta itemprop="isLiveBroadcast" content="True">',
      );
      return isLive;
    } catch (error) {
      console.error("Error fetching the URL:", error);
      return false;
    }
  };

  if (
    changeInfo.status === "complete" &&
    tab.url?.includes("youtube.com/watch") && tabId
  ) {
    const fetchData = async () => {
      if (currectUrl === tab.url) return;
      const isLive = await checkIfLiveStream();
      tab.url && (currectUrl = tab.url);

      console.log(currectUrl, isLive);
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
    };
    fetchData();
  }
}
