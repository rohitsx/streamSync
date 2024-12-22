import { UrlListenerProp } from "@/types/bgType";

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
    tab.url?.includes("youtube.com/watch")
  ) {
    const fetchData = async () => {
      const isLive = await checkIfLiveStream();

      if (!isLive || !tabId) return false;
      chrome.scripting
        .executeScript({
          target: { tabId },
          files: [" ./assests/ContentMain.tsx-DmGU-Ckn.js"],
        })
        .then(() => console.log("injected script file"));
    };
    fetchData();
  }
}
